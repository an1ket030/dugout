/**
 * Rain Canvas Overlay
 * Simulates cold, diagonal Lancashire rain cutting through floodlights
 * and droplets running down the camera lens.
 */

import { useEffect, useRef } from 'react'

export default function RainOverlay({ opacity = 0.25 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const w = (canvas.width = window.innerWidth)
    const h = (canvas.height = window.innerHeight)

    // Drops pool
    const dropCount = Math.floor(w * 0.12)
    const drops = Array.from({ length: dropCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      length: 12 + Math.random() * 20,
      speed: 16 + Math.random() * 12,
      thickness: 0.8 + Math.random() * 0.8,
      alpha: 0.1 + Math.random() * 0.3,
    }))

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = '#c6d1cb'

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i]
        ctx.beginPath()
        ctx.lineWidth = d.thickness
        ctx.globalAlpha = d.alpha * opacity
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x - 4, d.y + d.length)
        ctx.stroke()

        d.y += d.speed
        d.x -= 3

        if (d.y > h) {
          d.y = -d.length
          d.x = Math.random() * w
        }
        if (d.x < 0) {
          d.x = w
        }
      }

      animId = requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [opacity])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
    />
  )
}
