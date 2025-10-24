"use client"

import { cn } from "@/lib/utils"
import { CaplingNameEditor } from "./capling-name-editor"
import { useCaplingLevels } from "@/hooks/use-capling-levels"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

type CaplingMood = "happy" | "neutral" | "worried" | "sad" | "depressed"

interface CaplingCharacterProps {
  mood: CaplingMood
  className?: string
  name?: string
  showNameEditor?: boolean
  onNameUpdate?: (newName: string) => void
  userId?: string
}

function DinosaurSVG({ mood }: { mood: CaplingMood }) {
  const getEyeExpression = () => {
    switch (mood) {
      case "happy":
        return (
          <>
            <circle cx="35" cy="45" r="4" fill="#2d3748" />
            <circle cx="65" cy="45" r="4" fill="#2d3748" />
            <circle cx="36" cy="44" r="1.5" fill="white" />
            <circle cx="66" cy="44" r="1.5" fill="white" />
          </>
        )
      case "neutral":
        return (
          <>
            <circle cx="35" cy="45" r="3.5" fill="#2d3748" />
            <circle cx="65" cy="45" r="3.5" fill="#2d3748" />
          </>
        )
      case "worried":
        return (
          <>
            <ellipse cx="35" cy="47" rx="4" ry="3" fill="#2d3748" />
            <ellipse cx="65" cy="47" rx="4" ry="3" fill="#2d3748" />
          </>
        )
      case "sad":
        return (
          <>
            <path d="M 33 48 Q 35 46 37 48" stroke="#2d3748" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 63 48 Q 65 46 67 48" stroke="#2d3748" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        )
      case "depressed":
        return (
          <>
            <path d="M 33 48 Q 35 46 37 48" stroke="#2d3748" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 63 48 Q 65 46 67 48" stroke="#2d3748" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Tears */}
            <circle cx="35" cy="52" r="1" fill="#3b82f6" opacity="0.7" />
            <circle cx="65" cy="52" r="1" fill="#3b82f6" opacity="0.7" />
          </>
        )
    }
  }

  const getMouthExpression = () => {
    switch (mood) {
      case "happy":
        return <path d="M 35 60 Q 50 70 65 60" stroke="#2d3748" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      case "neutral":
        return <line x1="38" y1="62" x2="62" y2="62" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />
      case "worried":
        return <path d="M 35 65 Q 50 62 65 65" stroke="#2d3748" strokeWidth="2" fill="none" strokeLinecap="round" />
      case "sad":
        return <path d="M 35 65 Q 50 58 65 65" stroke="#2d3748" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      case "depressed":
        return <path d="M 35 68 Q 50 62 65 68" stroke="#2d3748" strokeWidth="3" fill="none" strokeLinecap="round" />
    }
  }

  return (
    <svg viewBox="0 0 100 120" className="w-full h-full text-ring">
      {/* Body shadow */}
      <ellipse cx="52" cy="77" rx="35" ry="30" fill="#16a34a" opacity="0.3" />
      
      {/* Body */}
      <ellipse cx="50" cy="75" rx="35" ry="30" fill="#4ade80" />

      {/* Head shadow */}
      <circle cx="52" cy="42" r="28" fill="#16a34a" opacity="0.3" />
      
      {/* Head */}
      <circle cx="50" cy="40" r="28" fill="#4ade80" />

      {/* Belly spot */}
      <ellipse cx="50" cy="78" rx="22" ry="18" fill="#86efac" opacity="0.8" />

      {/* Spikes on back */}
      <path d="M 30 70 L 25 60 L 30 65 Z" fill="#15803d" />
      <path d="M 40 72 L 37 60 L 42 68 Z" fill="#15803d" />
      <path d="M 50 73 L 48 60 L 52 70 Z" fill="#15803d" />
      <path d="M 60 72 L 58 60 L 63 68 Z" fill="#15803d" />
      <path d="M 70 70 L 68 60 L 73 65 Z" fill="#15803d" />

      {/* Arms */}
      <ellipse cx="22" cy="70" rx="8" ry="12" fill="#4ade80" />
      <ellipse cx="78" cy="70" rx="8" ry="12" fill="#4ade80" />

      {/* Feet */}
      <ellipse cx="38" cy="100" rx="10" ry="8" fill="#4ade80" />
      <ellipse cx="62" cy="100" rx="10" ry="8" fill="#4ade80" />

      {/* Tail */}
      <path d="M 80 80 Q 95 85 92 95" stroke="#4ade80" strokeWidth="12" fill="none" strokeLinecap="round" />

      {/* Cheeks */}
      {mood === "happy" && (
        <>
          <circle cx="25" cy="50" r="5" fill="#fb923c" opacity="0.4" />
          <circle cx="75" cy="50" r="5" fill="#fb923c" opacity="0.4" />
        </>
      )}

      {/* Eyes */}
      {getEyeExpression()}

      {/* Mouth */}
      {getMouthExpression()}

      {/* Nostrils */}
      <circle cx="45" cy="52" r="1.5" fill="#2d3748" opacity="0.6" />
      <circle cx="55" cy="52" r="1.5" fill="#2d3748" opacity="0.6" />
    </svg>
  )
}

export function CaplingCharacter({ mood, className, name = "Capling", showNameEditor = false, onNameUpdate, userId }: CaplingCharacterProps) {
  const { levelInfo, getLevelTitle, getLevelColor } = useCaplingLevels()

  const getAuraGlow = (level: number) => {
    if (level >= 20) return {
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.8),0_0_60px_rgba(236,72,153,0.6),0_0_90px_rgba(168,85,247,0.4)]',
      pulse: 'animate-aura-pulse animate-aura-glow',
      intensity: 'legendary',
      shimmer: true
    } // Legendary - Purple/Pink intense glow with shimmer
    if (level >= 15) return {
      glow: 'shadow-[0_0_25px_rgba(59,130,246,0.7),0_0_50px_rgba(147,51,234,0.5)]',
      pulse: 'animate-aura-pulse animate-aura-glow',
      intensity: 'high',
      shimmer: false
    } // Expert - Blue/Purple strong glow
    if (level >= 10) return {
      glow: 'shadow-[0_0_20px_rgba(34,197,94,0.6),0_0_40px_rgba(59,130,246,0.4)]',
      pulse: 'animate-aura-pulse',
      intensity: 'medium',
      shimmer: false
    } // Advanced - Green/Blue medium glow
    if (level >= 5) return {
      glow: 'shadow-[0_0_15px_rgba(234,179,8,0.5),0_0_30px_rgba(249,115,22,0.3)]',
      pulse: 'animate-aura-pulse',
      intensity: 'low',
      shimmer: false
    } // Intermediate - Yellow/Orange subtle glow
    return {
      glow: 'shadow-[0_0_10px_rgba(107,114,128,0.3)]',
      pulse: '',
      intensity: 'minimal',
      shimmer: false
    } // Beginner - Gray minimal glow
  }
  
  const getMoodColor = () => {
    switch (mood) {
      case "happy":
        return "from-green-400 to-emerald-500"
      case "neutral":
        return "from-blue-400 to-cyan-500"
      case "worried":
        return "from-yellow-400 to-orange-500"
      case "sad":
        return "from-red-400 to-pink-500"
      case "depressed":
        return "from-gray-600 to-gray-800"
      default:
        return "from-green-400 to-emerald-500"
    }
  }

  const getMoodEmoji = () => {
    switch (mood) {
      case "happy":
        return "😊"
      case "neutral":
        return "😐"
      case "worried":
        return "😟"
      case "sad":
        return "😢"
      case "depressed":
        return "💔"
      default:
        return "😊"
    }
  }

  const getMoodMessage = () => {
    switch (mood) {
      case "happy":
        return "Great job! Keep it up!"
      case "neutral":
        return "You're doing okay!"
      case "worried":
        return "Let's be more careful!"
      case "sad":
        return "We can do better!"
      case "depressed":
        return "We need to fix this!"
      default:
        return "Great job! Keep it up!"
    }
  }

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      {/* Name and edit button above the character */}
      <div className="text-center w-full">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-3xl font-bold text-foreground">{name}</h3>
          {showNameEditor && onNameUpdate && userId && (
            <CaplingNameEditor
              currentName={name}
              onNameUpdate={onNameUpdate}
              userId={userId}
            />
          )}
        </div>
      </div>
      
      <div
        className={cn(
          "relative flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br shadow-2xl transition-all duration-700 p-12 border-4 border-white/20",
          getMoodColor(),
          levelInfo && getAuraGlow(levelInfo.level).glow,
          levelInfo && getAuraGlow(levelInfo.level).pulse
        )}
      >
        {/* Mood-based glow effect */}
        <div className={cn(
          "absolute inset-0 rounded-full blur-xl opacity-30 transition-all duration-700",
          getMoodColor()
        )} />
        
        {/* Level-based aura glow */}
        {levelInfo && (
          <div className={cn(
            "absolute inset-0 rounded-full blur-2xl opacity-40 transition-all duration-1000",
            getAuraGlow(levelInfo.level).pulse,
            getAuraGlow(levelInfo.level).shimmer && "animate-legendary-shimmer"
          )} style={{
            background: levelInfo.level >= 20 
              ? 'radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(236,72,153,0.4) 50%, transparent 70%)'
              : levelInfo.level >= 15
              ? 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(147,51,234,0.3) 50%, transparent 70%)'
              : levelInfo.level >= 10
              ? 'radial-gradient(circle, rgba(34,197,94,0.4) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)'
              : levelInfo.level >= 5
              ? 'radial-gradient(circle, rgba(234,179,8,0.3) 0%, rgba(249,115,22,0.2) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(107,114,128,0.2) 0%, transparent 70%)'
          }} />
        )}
        
        {/* Character */}
        <div className="relative z-10 animate-bounce-subtle scale-100 drop-shadow-2xl">
          <DinosaurSVG mood={mood} />
        </div>
      </div>

      {/* Level and XP Information */}
      {levelInfo && (
        <div className="w-full max-w-sm space-y-3">
          {/* Level Badge */}
          <div className="flex items-center justify-center gap-2">
            <Badge 
              className={`bg-gradient-to-r ${getLevelColor(levelInfo.level)} text-white border-0 px-3 py-1 text-sm font-semibold`}
            >
              Level {levelInfo.level}
            </Badge>
            <span className="text-sm text-muted-foreground font-medium">
              {getLevelTitle(levelInfo.level)}
            </span>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{levelInfo.xp} XP</span>
              <span>{levelInfo.xpForNextLevel} XP to next level</span>
            </div>
            <Progress 
              value={levelInfo.progressPercentage} 
              className="h-2"
            />
          </div>
        </div>
      )}
    </div>
  )
}
