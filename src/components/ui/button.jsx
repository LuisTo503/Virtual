import { cva } from 'class-variance-authority'
import { cn } from '../../lib/cn.js'

const buttonVariants = cva('ui-button', {
  variants: {
    variant: {
      default: 'ui-button--default',
      outline: 'ui-button--outline',
      ghost: 'ui-button--ghost',
    },
    size: {
      default: 'ui-button--default-size',
      sm: 'ui-button--sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export function Button({ className, variant, size, ...props }) {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
