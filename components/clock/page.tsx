"use client"

import { CSSProperties, useEffect, useState } from 'react'
import styles from './clock.module.css'

function Clock() {

  const [ampm, setAmpm] = useState('AM')
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [dayOfWeek, setDayOfWeek] = useState(0)
  const [day, setDay] = useState(1)
  const [month, setMonth] = useState(0)
  const [isAtClock, setIsAtClock] = useState(false)

  const dayOfWeekNames: Array<string> = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ]

  const monthNames: Array<string> = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]

  const updateClock = () => {
    const date = new Date()
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const dayOfWeek = date.getDay()
    const day = date.getDate()
    const month = date.getMonth()
    setHours(hours)
    setMinutes(minutes)
    setSeconds(seconds)
    setAmpm(ampm)
    setDayOfWeek(dayOfWeek)
    setDay(day)
    setMonth(month)

    isAtClockAnalizer(minutes, seconds)
  }

  useEffect(() => {
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [updateClock])

  const isAtClockAnalizer = (minutes: number, seconds: number): void => {

    const minutesIsZero = minutes === 0
    if (!minutesIsZero) { setIsAtClock(false) }

    const secondsIsEven = seconds % 2 === 0
    const newIsAtClock = minutesIsZero && secondsIsEven

    setIsAtClock(newIsAtClock)
  }

  const formatTime = (time: number): string => {
    return time.toString().padStart(2, '0')
  }

  const formatDayOfWeek = (dayOfWeek: number): string => {
    return dayOfWeekNames[dayOfWeek]
  }

  const formatMonth = (month: number): string => {
    return monthNames[month]
  }

  const clockStyles: CSSProperties = {
    filter: isAtClock ? 'invert(100%)' : 'none',
  }

  return (
    <section
      className={styles['clock']}
      style={clockStyles}
    >
      <div className={styles['hour-info']}>
        <div className={styles['hour-info__left']}>
          <span className={styles['hour-info__hours']}>
            {formatTime(hours)}
          </span>
          <span>:</span>
          <span className={styles['hour-info__minutes']}>
            {formatTime(minutes)}
          </span>
        </div>

        <div className={styles['hour-info__right']}>
          <span className={styles['hour-info__seconds']}>
            {formatTime(seconds)}
          </span>
          <span className={styles['hour-info__ampm']}>
            {ampm}
          </span>
        </div>
      </div>

      <div className={styles['date-info']}>
        <span className={styles['date-info__day-of-week']}>
          {formatDayOfWeek(dayOfWeek)},&nbsp;
          {isAtClock}
        </span>
        <span className={styles['date-info__day']}>
          {day}&nbsp;
        </span>
        <span className={styles['date-info__month']}>
          {formatMonth(month)}
        </span>
      </div>
    </section>
  )
}

export default Clock