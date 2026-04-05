import { useEffect, useMemo, useState } from 'react'
import styles from './InfoPanel.module.css'
import { trackEvent } from '../lib/analytics.js'

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;')

const buildVideoDoc = (video) => {
  const slides = (video.escenas || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('')
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    body{margin:0;font-family:Arial,sans-serif;background:linear-gradient(135deg,#0f2b22,#1d9e75);color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh}
    .card{width:min(92vw,720px);padding:28px;border-radius:24px;background:rgba(0,0,0,.28);box-shadow:0 18px 60px rgba(0,0,0,.28)}
    .eyebrow{font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.7}
    h1{margin:10px 0 12px;font-size:32px}
    p{line-height:1.6;opacity:.92}
    ul{margin:18px 0 0;padding-left:20px;display:grid;gap:10px}
    li{background:rgba(255,255,255,.12);padding:10px 12px;border-radius:12px}
  </style></head><body><div class="card"><div class="eyebrow">Microvideo</div><h1>${escapeHtml(video.titulo)}</h1><p>${escapeHtml(video.descripcion)}</p><ul>${slides}</ul></div></body></html>`
}

const buildActivityDoc = (activity) => {
  const checks = (activity.checklist || []).map((item) => `<label><input type="checkbox"> ${escapeHtml(item)}</label>`).join('')
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    body{margin:0;font-family:Arial,sans-serif;background:#f5f8f6;color:#183028;padding:22px}
    .wrap{max-width:760px;margin:0 auto;background:#fff;border-radius:22px;padding:24px;box-shadow:0 18px 40px rgba(0,0,0,.08)}
    .eyebrow{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#1d9e75}
    h1{margin:10px 0 12px;font-size:28px}
    p{line-height:1.65}
    .task{margin:16px 0;padding:14px 16px;border-radius:14px;background:#edf8f3}
    .grid{display:grid;gap:10px;margin-top:14px}
    label{display:flex;gap:10px;align-items:flex-start;padding:12px 14px;background:#f7faf8;border-radius:12px;border:1px solid #d8e7df}
  </style></head><body><div class="wrap"><div class="eyebrow">Actividad tipo H5P</div><h1>${escapeHtml(activity.titulo)}</h1><p>${escapeHtml(activity.descripcion)}</p><div class="task">${escapeHtml(activity.reto)}</div><div class="grid">${checks}</div></div></body></html>`
}

export default function InfoPanel({ scene, isOpen, onClose }) {
  const edu = scene?.educacion
  const [answers, setAnswers] = useState({})
  const [dragAnswers, setDragAnswers] = useState({})
  const [activeModal, setActiveModal] = useState(null)
  const [audioOn, setAudioOn] = useState(false)

  useEffect(() => {
    setAnswers({})
    setDragAnswers({})
    setActiveModal(null)
    setAudioOn(false)
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  }, [scene?.id])

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  }, [])

  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window

  const playNarration = () => {
    if (!canSpeak || !edu?.narracion) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(edu.narracion)
    utterance.lang = 'es-ES'
    utterance.rate = 0.95
    utterance.onend = () => setAudioOn(false)
    utterance.onerror = () => setAudioOn(false)
    setAudioOn(true)
    trackEvent('audio_play', { scene_id: scene?.id })
    window.speechSynthesis.speak(utterance)
  }

  const stopNarration = () => {
    if (!canSpeak) return
    window.speechSynthesis.cancel()
    setAudioOn(false)
  }

  const handleAnswer = (quizIdx, optionIdx) => {
    const quiz = edu?.quizzes?.[quizIdx]
    trackEvent('quiz_answer', {
      scene_id: scene?.id,
      quiz_index: quizIdx,
      quiz_kind: 'multiple_choice',
      selected_answer: optionIdx,
      is_correct: optionIdx === quiz?.correcta,
    })
    setAnswers((prev) => ({ ...prev, [quizIdx]: optionIdx }))
  }

  const handleDragStart = (event, value) => {
    event.dataTransfer.setData('text/plain', value)
  }

  const allowDrop = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event, quizIdx, category) => {
    event.preventDefault()
    const value = event.dataTransfer.getData('text/plain')
    if (!value) return
    const quiz = edu?.quizzes?.[quizIdx]
    const isCorrect = quiz?.respuestas?.[value] === category
    trackEvent('dragdrop_complete', {
      scene_id: scene?.id,
      quiz_index: quizIdx,
      dragged_value: value,
      category,
      is_correct: isCorrect,
    })
    setDragAnswers((prev) => ({
      ...prev,
      [quizIdx]: {
        ...(prev[quizIdx] || {}),
        [category]: value,
      },
    }))
  }

  const resources = useMemo(() => ([
    ...(edu?.ventanas || []).map((item) => ({ type: 'window', ...item })),
    ...(edu?.videos || []).map((item) => ({ type: 'video', ...item })),
    ...(edu?.h5pActivities || []).map((item) => ({ type: 'activity', ...item })),
  ]), [edu])
  const featuredVideo = edu?.videos?.[0]

  if (!edu) return null

  return (
    <>
      <div className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerIcon}>{scene?.icon}</span>
            <span className={styles.headerTitle}>{edu.titulo}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>Cerrar</button>
        </div>

        <div className={styles.body}>
          <p className={styles.description}>{edu.descripcion}</p>

          <div className={styles.audioBox}>
            <div>
              <div className={styles.audioTitle}>Narracion guiada</div>
              <div className={styles.audioText}>{edu.narracion}</div>
            </div>
            <div className={styles.audioActions}>
              <button className={styles.audioBtn} onClick={playNarration} disabled={!canSpeak || audioOn}>Escuchar audio</button>
              <button className={styles.audioBtnAlt} onClick={stopNarration} disabled={!audioOn}>Detener</button>
            </div>
          </div>

          {featuredVideo && (
            <div className={styles.featuredBox}>
              <div>
                <div className={styles.sectionTitle}>Microvideo destacado</div>
                <div className={styles.resourceDescription}>{featuredVideo.descripcion}</div>
              </div>
              <button className={styles.audioBtn} onClick={() => {
                trackEvent('video_open', { scene_id: scene?.id, video_id: featuredVideo.id })
                setActiveModal({ type: 'video', ...featuredVideo })
              }}>
                Ver microvideo
              </button>
            </div>
          )}

          <div className={styles.sectionTitle}>Quiz de aprendizaje</div>
          <div className={styles.quizGrid}>
            {(edu.quizzes || []).map((quiz, quizIdx) => {
              const selected = answers[quizIdx]
              return (
                <div key={quizIdx} className={styles.quizBox}>
                  <div className={styles.quizLabel}>Quiz {quizIdx + 1}</div>
                  {'kind' in quiz && quiz.kind === 'dragdrop' ? (
                    <>
                      <div className={styles.quizQuestion}>{quiz.titulo}</div>
                      <div className={styles.dragInstructions}>{quiz.instrucciones}</div>
                      <div className={styles.dragPool}>
                        {quiz.opciones.map((item) => (
                          <button
                            key={item}
                            draggable
                            onDragStart={(event) => handleDragStart(event, item)}
                            className={styles.dragChip}
                            type="button"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                      <div className={styles.dragTargets}>
                        {quiz.categorias.map((category) => {
                          const dropped = dragAnswers[quizIdx]?.[category]
                          const isCorrect = dropped && quiz.respuestas[dropped] === category
                          return (
                            <div
                              key={category}
                              className={`${styles.dropZone} ${dropped ? (isCorrect ? styles.dropZoneCorrect : styles.dropZoneWrong) : ''}`}
                              onDragOver={allowDrop}
                              onDrop={(event) => handleDrop(event, quizIdx, category)}
                            >
                              <div className={styles.dropLabel}>{category}</div>
                              <div className={styles.dropValue}>{dropped || 'Suelta aqui'}</div>
                            </div>
                          )
                        })}
                      </div>
                      {Object.keys(dragAnswers[quizIdx] || {}).length > 0 && (
                        <div className={styles.feedback}>
                          {quiz.explicacion}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className={styles.quizQuestion}>{quiz.pregunta}</div>
                      <div className={styles.optList}>
                        {quiz.opciones.map((opt, optionIdx) => {
                          let className = styles.opt
                          if (selected !== undefined) {
                            if (optionIdx === quiz.correcta) className = `${styles.opt} ${styles.correct}`
                            else if (optionIdx === selected) className = `${styles.opt} ${styles.wrong}`
                            else className = `${styles.opt} ${styles.dimmed}`
                          }
                          return (
                            <button
                              key={optionIdx}
                              className={className}
                              onClick={() => handleAnswer(quizIdx, optionIdx)}
                              disabled={selected !== undefined}
                            >
                              <span className={styles.optLetter}>{String.fromCharCode(65 + optionIdx)}</span>
                              {opt}
                            </button>
                          )
                        })}
                      </div>
                      {selected !== undefined && (
                        <div className={`${styles.feedback} ${selected === quiz.correcta ? styles.feedbackCorrect : styles.feedbackWrong}`}>
                          {quiz.explicacion}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>

          <div className={styles.sectionTitle}>Ventanas, videos y actividad</div>
          <div className={styles.resourceGrid}>
            {resources.map((resource) => (
              <button key={`${resource.type}-${resource.id}`} className={styles.resourceCard} onClick={() => {
                trackEvent(resource.type === 'video' ? 'video_open' : 'resource_open', {
                  scene_id: scene?.id,
                  resource_id: resource.id,
                  resource_type: resource.type,
                })
                setActiveModal(resource)
              }}>
                <div className={styles.resourceType}>
                  {resource.type === 'window' ? 'Ventana' : resource.type === 'video' ? 'Video' : 'H5P'}
                </div>
                <div className={styles.resourceTitle}>{resource.titulo}</div>
                <div className={styles.resourceDescription}>{resource.descripcion || resource.etiqueta || resource.contenido}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeModal && (
        <div className={styles.modalBackdrop} onClick={() => setActiveModal(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <div className={styles.modalType}>
                  {activeModal.type === 'window' ? 'Ventana de aprendizaje' : activeModal.type === 'video' ? 'Microvideo' : 'Actividad tipo H5P'}
                </div>
                <div className={styles.modalTitle}>{activeModal.titulo}</div>
              </div>
              <button className={styles.closeBtn} onClick={() => setActiveModal(null)}>Cerrar</button>
            </div>

            {activeModal.type === 'window' && (
              <div className={styles.modalBody}>
                <p>{activeModal.contenido}</p>
              </div>
            )}

            {activeModal.type === 'video' && (
              <div className={styles.embedWrap}>
                <iframe title={activeModal.titulo} srcDoc={buildVideoDoc(activeModal)} className={styles.embedFrame} />
              </div>
            )}

            {activeModal.type === 'activity' && (
              <div className={styles.embedWrap}>
                <iframe title={activeModal.titulo} srcDoc={buildActivityDoc(activeModal)} className={styles.embedFrame} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
