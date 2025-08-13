import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStatsStore } from '../store/statsStore'
import Card from '../components/Card'
import Button from '../components/Button'
import Header from '../components/Header'
import BottomNavigation from '../components/BottomNavigation'

interface Exercise {
  id: number
  name: string
  description: string
  duration: number // в секундах
  difficulty: 'Легко' | 'Средне' | 'Сложно'
  videoUrl: string
  instructions: string[]
}

const exercises: Exercise[] = [
  {
    id: 1,
    name: 'Подъём бровей',
    description: 'Укрепляет мышцы лба и улучшает подвижность бровей',
    duration: 30,
    difficulty: 'Легко',
    videoUrl: '/videos/exercise-demo.mp4', // Локальное видео
    instructions: [
      'Расслабьте лицо',
      'Медленно поднимите брови как можно выше',
      'Удерживайте 3 секунды',
      'Медленно опустите брови',
      'Повторяйте в течение 30 секунд'
    ]
  },
  {
    id: 2,
    name: 'Надувание щёк',
    description: 'Тренирует мышцы щёк и улучшает тонус кожи',
    duration: 45,
    difficulty: 'Легко',
    videoUrl: '/videos/exercise-demo.mp4', // Локальное видео
    instructions: [
      'Закройте рот',
      'Надуйте щёки воздухом',
      'Перекатывайте воздух от щеки к щеке',
      'Выпустите воздух через сжатые губы',
      'Повторяйте упражнение'
    ]
  },
  {
    id: 3,
    name: 'Рыбка',
    description: 'Подтягивает область вокруг рта и щёк',
    duration: 60,
    difficulty: 'Средне',
    videoUrl: '/videos/exercise-demo.mp4', // Локальное видео
    instructions: [
      'Втяните щёки внутрь',
      'Сожмите губы как у рыбки',
      'Попытайтесь улыбнуться в этом положении',
      'Удерживайте напряжение',
      'Расслабьте и повторите'
    ]
  },
  {
    id: 4,
    name: 'Лифтинг подбородка',
    description: 'Укрепляет мышцы шеи и подбородка',
    duration: 45,
    difficulty: 'Сложно',
    videoUrl: '/videos/exercise-demo.mp4', // Локальное видео
    instructions: [
      'Наклоните голову назад',
      'Выдвиньте нижнюю челюсть вперёд',
      'Почувствуйте натяжение под подбородком',
      'Удерживайте 5 секунд',
      'Вернитесь в исходное положение'
    ]
  }
]

const Exercises: React.FC = () => {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const { updateStats } = useStatsStore()

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isVideoPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsCompleted(true)
            setIsVideoPlaying(false)
            
            // Обновляем статистику при завершении упражнения
            if (selectedExercise) {
              updateStats(1, Math.ceil(selectedExercise.duration / 60), 15)
            }
            
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isVideoPlaying, timeLeft, selectedExercise, updateStats])

  useEffect(() => {
    // Автоматически запускаем видео при выборе упражнения
    if (selectedExercise && videoRef.current) {
      videoRef.current.play().catch(e => {
        console.log('Автовоспроизведение заблокировано браузером:', e)
      })
    }
  }, [selectedExercise])

  const startExercise = (exercise: Exercise, index: number) => {
    setSelectedExercise(exercise)
    setCurrentExerciseIndex(index)
    setTimeLeft(exercise.duration)
    setIsCompleted(false)
    setIsVideoPlaying(false)
  }

  const nextExercise = () => {
    const nextIndex = currentExerciseIndex + 1
    if (nextIndex < exercises.length) {
      const nextEx = exercises[nextIndex]
      startExercise(nextEx, nextIndex)
    } else {
      // Все упражнения завершены
      setSelectedExercise(null)
    }
  }

  const resetExercise = () => {
    setSelectedExercise(null)
    setIsVideoPlaying(false)
    setTimeLeft(0)
    setIsCompleted(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Легко': return 'bg-green-100 text-green-600'
      case 'Средне': return 'bg-yellow-100 text-yellow-600'
      case 'Сложно': return 'bg-red-100 text-red-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Легко': return '🟢'
      case 'Средне': return '🟡'
      case 'Сложно': return '🔴'
      default: return '⚪'
    }
  }

  const handleExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setCurrentExerciseIndex(exercises.findIndex(ex => ex.id === exercise.id))
    setTimeLeft(exercise.duration)
    setIsCompleted(false)
    setIsVideoPlaying(false)
  }

  const handleBackClick = () => {
    setSelectedExercise(null)
    setCurrentExerciseIndex(0)
    setTimeLeft(0)
    setIsCompleted(false)
    setIsVideoPlaying(false)
  }

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--page-bg)' }}>
      <Header title="Упражнения" onBackClick={handleBackClick} />

      <div className="max-w-md mx-auto p-4 space-y-6">
        {!selectedExercise ? (
          // Список упражнений
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Выберите упражнение</h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Тренируйте мышцы лица для красоты и здоровья</p>
            </div>
            
            {exercises.map((exercise, index) => (
              <Card 
                key={exercise.id} 
                onClick={() => startExercise(exercise, index)}
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{exercise.name}</h3>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{exercise.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center space-x-1">
                        <span>⏱️</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{exercise.duration} сек</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>📊</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{exercise.difficulty}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl ml-4">➡️</div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          // Детали упражнения
          selectedExercise && (
            <div>
              {/* Заголовок с кнопкой "Назад" в одну строку */}
              <div className="flex items-center justify-between mb-4">
                <Button
                  onClick={handleBackClick}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <span>←</span>
                  <span>Назад</span>
                </Button>
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{selectedExercise.name}</h2>
                <div className="w-20"></div> {/* Пустое место для баланса */}
              </div>

              <p className="text-sm text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
                Выполняйте упражнение вместе с видео
              </p>

              {/* Exercise Info */}
              <Card className="border-l-4 border-l-indigo-500 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{selectedExercise.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{selectedExercise.description}</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 ml-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(selectedExercise.difficulty)}`}>
                      {getDifficultyIcon(selectedExercise.difficulty)} {selectedExercise.difficulty}
                    </span>
                    <div className="text-center">
                      <div className="text-lg font-bold text-indigo-600">{formatTime(selectedExercise.duration)}</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Длительность</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Instructions */}
              <Card className="border-l-4 border-l-blue-500 mb-3" style={{ 
                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                borderLeftColor: '#3b82f6'
              }}>
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: 'var(--bg-primary)' }}>
                    📋
                  </div>
                  <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Инструкции</h3>
                </div>
                <ol className="space-y-2">
                  {selectedExercise.instructions.map((instruction: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2 p-2 rounded-lg" style={{ 
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--card-border)'
                    }}>
                      <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </Card>

              {/* Video */}
              <Card className="border-l-4 border-l-purple-500 mb-3" style={{ 
                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                borderLeftColor: '#8b5cf6'
              }}>
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: 'var(--bg-primary)' }}>
                    🎥
                  </div>
                  <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Выполняйте упражнение вместе с видео
                  </h3>
                </div>
                
                <div className="relative rounded-xl overflow-hidden bg-gray-900 mb-4 shadow-lg">
                  <video 
                    ref={videoRef}
                    className="w-full h-48 object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNEY0NkU1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxOCIgZm9udC1mYW1pbHk9IkFyaWFsIj7QndCw0LbQvNC40YLQtSDQtNC70Y8g0L/RgNC+0YHQvNC+0YLRgNCwPC90ZXh0Pgo8L3N2Zz4="
                  >
                    <source src={selectedExercise.videoUrl} type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                  </video>
                </div>

                {/* Кнопка начала упражнения */}
                {!isVideoPlaying && !isCompleted && (
                  <div className="text-center mb-4">
                    <Button
                      onClick={() => setIsVideoPlaying(true)}
                      variant="primary"
                      size="lg"
                      fullWidth
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      🚀 Начать упражнение
                    </Button>
                    <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                      Нажмите кнопку чтобы запустить таймер и начать упражнение
                    </p>
                  </div>
                )}

                {/* Timer под видео */}
                <div className="text-center rounded-xl p-4 shadow-sm" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <div className={`text-4xl font-bold mb-2 ${isCompleted ? 'text-green-600' : 'text-indigo-600'}`}>
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                    {isCompleted ? '🎉 Упражнение завершено!' : isVideoPlaying ? 'Выполняйте упражнение...' : ''}
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${isCompleted ? 'bg-green-500' : 'bg-indigo-600'}`}
                      style={{ width: `${((selectedExercise.duration - timeLeft) / selectedExercise.duration) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* Progress percentage */}
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {Math.round(((selectedExercise.duration - timeLeft) / selectedExercise.duration) * 100)}% выполнено
                  </div>
                </div>
              </Card>

              {/* Control Buttons */}
              <div className="space-y-3">
                {isCompleted ? (
                  <div className="space-y-3">
                    <div className="text-center p-4 rounded-xl border border-green-200" style={{ 
                      background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)'
                    }}>
                      <div className="text-3xl mb-2">🎉</div>
                      <h3 className="font-bold mb-2 text-lg" style={{ color: 'var(--text-primary)' }}>Отличная работа!</h3>
                      <p style={{ color: 'var(--text-secondary)' }}>Упражнение выполнено успешно</p>
                    </div>
                    
                    {currentExerciseIndex < exercises.length - 1 ? (
                      <Button 
                        onClick={nextExercise}
                        variant="primary"
                        size="lg"
                        fullWidth
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      >
                        ➡️ Следующее упражнение
                      </Button>
                    ) : (
                      <Button 
                        onClick={resetExercise}
                        variant="accent"
                        size="lg"
                        fullWidth
                        className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
                      >
                        🏆 Все упражнения завершены!
                      </Button>
                    )}
                    
                    <Button 
                      onClick={resetExercise}
                      variant="outline"
                      fullWidth
                      className="border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                      Вернуться к списку
                    </Button>
                  </div>
                ) : (
                  <div className="text-center p-4 rounded-xl border border-blue-200" style={{ 
                    background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)'
                  }}>
                    <div className="text-2xl mb-2">💡</div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      Начните упражнение для запуска таймера и завершите для перехода к следующему
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}

export default Exercises 