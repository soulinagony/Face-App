import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

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
    videoUrl: 'https://videos.pexels.com/video-files/6991528/6991528-uhd_1440_2732_30fps.mp4',
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
    videoUrl: 'https://videos.pexels.com/video-files/6991463/6991463-uhd_1440_2732_30fps.mp4',
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
    videoUrl: 'https://videos.pexels.com/video-files/8054492/8054492-uhd_1440_2732_30fps.mp4',
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
    videoUrl: 'https://videos.pexels.com/video-files/6991444/6991444-uhd_1440_2732_30fps.mp4',
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

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isVideoPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsCompleted(true)
            setIsVideoPlaying(false)
            if (videoRef.current) {
              videoRef.current.pause()
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isVideoPlaying, timeLeft])

  const startExercise = (exercise: Exercise, index: number) => {
    setSelectedExercise(exercise)
    setCurrentExerciseIndex(index)
    setTimeLeft(exercise.duration)
    setIsCompleted(false)
    setIsVideoPlaying(false)
  }

  const handleVideoPlay = () => {
    setIsVideoPlaying(true)
  }

  const handleVideoPause = () => {
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

  if (selectedExercise) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={resetExercise}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                ← Назад к упражнениям
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className="w-10 h-10 bg-gray-500 rounded-xl flex items-center justify-center text-white text-sm font-medium hover:scale-110 transition-transform cursor-pointer hover:bg-indigo-600"
                title="Профиль"
              >
                👤
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-md mx-auto p-4 space-y-6">
          {/* Exercise Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{selectedExercise.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedExercise.difficulty)}`}>
                {selectedExercise.difficulty}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{selectedExercise.description}</p>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Инструкции</h3>
            <ol className="space-y-2">
              {selectedExercise.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Video */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🎥 Выполняйте упражнение вместе с видео
            </h3>
            <div className="relative rounded-lg overflow-hidden bg-gray-900 mb-4">
              <video 
                ref={videoRef}
                className="w-full h-48 object-cover"
                controls
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNEY0NkU1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxOCIgZm9udC1mYW1pbHk9IkFyaWFsIj7QndCw0LbQvNC40YLQtSDQtNC70Y8g0L/RgNC+0YHQvNC+0YLRgNCwPC90ZXh0Pgo8L3N2Zz4="
              >
                <source src={selectedExercise.videoUrl} type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>

            {/* Timer под видео */}
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isCompleted ? 'text-green-600' : 'text-indigo-600'}`}>
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                {isCompleted ? '🎉 Упражнение завершено!' : isVideoPlaying ? 'Выполняйте упражнение...' : 'Нажмите play чтобы начать'}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${isCompleted ? 'bg-green-500' : 'bg-indigo-600'}`}
                  style={{ width: `${((selectedExercise.duration - timeLeft) / selectedExercise.duration) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="space-y-3">
            {isCompleted ? (
              <div className="space-y-3">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl mb-2">🎉</div>
                  <h3 className="font-semibold text-green-800 mb-1">Отличная работа!</h3>
                  <p className="text-green-600 text-sm">Упражнение выполнено успешно</p>
                </div>
                
                {currentExerciseIndex < exercises.length - 1 ? (
                  <button 
                    onClick={nextExercise}
                    className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-lg transition-all"
                  >
                    ➡️ Следующее упражнение
                  </button>
                ) : (
                  <button 
                    onClick={resetExercise}
                    className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg transition-all"
                  >
                    🏆 Все упражнения завершены!
                  </button>
                )}
                
                <button 
                  onClick={resetExercise}
                  className="w-full py-3 px-6 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-medium transition-all"
                >
                  Вернуться к списку
                </button>
              </div>
            ) : (
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <p className="text-blue-800 text-sm">
                  Запустите видео чтобы начать упражнение и таймер
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 z-50">
          <div className="max-w-md mx-auto">
            <div className="flex justify-around">
              {[
                { icon: '🏠', label: 'Домой', path: '/' },
                { icon: '📊', label: 'Прогресс', path: '/progress' },
                { icon: '📋', label: 'Упражнения', path: '/exercises', active: true },
                { icon: '👤', label: 'Профиль', path: '/profile' }
              ].map((item, index) => (
                <button 
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                    item.active ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  <div className="text-xl mb-1">{item.icon}</div>
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Упражнения</h1>
          <button 
              onClick={() => navigate('/profile')}
              className="w-10 h-10 bg-gray-500 rounded-xl flex items-center justify-center text-white text-sm font-medium hover:scale-110 transition-transform cursor-pointer hover:bg-indigo-600"
              title="Профиль"
          >
              👤
          </button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Motivational Banner */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">💪</div>
          <h2 className="text-xl font-bold mb-2">Время тренировки!</h2>
          <p className="text-indigo-100">Выберите упражнение и начните укреплять мышцы лица</p>
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <div key={exercise.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-800 text-lg">{exercise.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{exercise.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    ⏱️ {formatTime(exercise.duration)}
                  </span>
                  <span className="flex items-center">
                    🎯 {exercise.difficulty}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => startExercise(exercise, index)}
                className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                Начать упражнение
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 z-50">
        <div className="max-w-md mx-auto">
          <div className="flex justify-around">
            {[
              { icon: '🏠', label: 'Домой', path: '/' },
              { icon: '📊', label: 'Прогресс', path: '/progress' },
              { icon: '📋', label: 'Упражнения', path: '/exercises', active: true },
              { icon: '👤', label: 'Профиль', path: '/profile' }
            ].map((item, index) => (
              <button 
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                  item.active ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <div className="text-xl mb-1">{item.icon}</div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Exercises 