"use client"

import styles from './page.module.css'
import { loadModel } from '@/utils/model'
import { useState } from 'react'

interface Data {
  className: string
  probability: number
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<any>(null)
  const [data, setData] = useState<Data[]>([])

  const handleload = async (e: any) => {
    e.preventDefault()
    const element = e.target.files[0]

    if (!element) return

    setIsLoading(true)
    const reader = new FileReader()
    reader.readAsDataURL(element)
    reader.onload = () => {
      setImage(reader.result)
    }

    const img = document.getElementById('selected-image')
    const data = await loadModel(img)

    if (data) setData(data)
    setIsLoading(false)
  }
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <img id='selected-image' className={styles.selectedImage} src={image} width={200} height={200} />
        <input onChange={(e) => handleload(e)} type='file' name='image' accept='image/*' disabled={isLoading} />
        <div className={styles.resultsContent}>
          {data && data.map(({ className, probability }) => (
            <div key={className} className={styles.results}>
              <p>{className}</p> <p className={styles.divider}>-</p> <p>{probability}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
