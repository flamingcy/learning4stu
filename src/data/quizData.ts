export interface Course {
  id: string
  title: string
  description: string
  image: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  lessons: number
  students: number
  rating: number
}

export interface QuizProblem {
  id: number
  type: "addition" | "subtraction" | "counting"
  leftItems: { emoji: string; count: number; label: string }
  rightItems: { emoji: string; count: number; label: string }
  unit: string
  answer: number
}

export const courses: Course[] = [
  {
    id: "math-basic",
    title: "趣味数学启蒙",
    description: "通过生动有趣的图形和动画，让孩子爱上数学，掌握加减法基础",
    image: "/images/math-course.png",
    category: "数学",
    difficulty: "easy",
    lessons: 24,
    students: 3280,
    rating: 4.9,
  },
  {
    id: "chinese-reading",
    title: "快乐识字阅读",
    description: "精选经典童话故事，在阅读中认识汉字，培养语言表达能力",
    image: "/images/chinese-course.png",
    category: "语文",
    difficulty: "easy",
    lessons: 30,
    students: 4120,
    rating: 4.8,
  },
  {
    id: "english-fun",
    title: "英语趣味启蒙",
    description: "通过儿歌、游戏和互动练习，让孩子轻松掌握基础英语词汇",
    image: "/images/english-course.png",
    category: "英语",
    difficulty: "easy",
    lessons: 20,
    students: 2890,
    rating: 4.7,
  },
  {
    id: "science-explore",
    title: "科学小探险家",
    description: "有趣的科学实验和自然探索，激发孩子的好奇心和探索精神",
    image: "/images/science-course.png",
    category: "科学",
    difficulty: "medium",
    lessons: 18,
    students: 1960,
    rating: 4.9,
  },
  {
    id: "math-advanced",
    title: "数学思维训练",
    description: "进阶数学思维训练，培养逻辑推理和问题解决能力",
    image: "/images/math-course.png",
    category: "数学",
    difficulty: "medium",
    lessons: 28,
    students: 2150,
    rating: 4.8,
  },
  {
    id: "chinese-writing",
    title: "看图写话",
    description: "通过看图说话、写话练习，提升孩子的想象力和写作能力",
    image: "/images/chinese-course.png",
    category: "语文",
    difficulty: "medium",
    lessons: 22,
    students: 1780,
    rating: 4.6,
  },
]

export const quizProblems: QuizProblem[] = [
  {
    id: 1,
    type: "addition",
    leftItems: { emoji: "🍑", count: 4, label: "桃子" },
    rightItems: { emoji: "🍑", count: 5, label: "桃子" },
    unit: "个",
    answer: 9,
  },
  {
    id: 2,
    type: "addition",
    leftItems: { emoji: "🍄", count: 6, label: "蘑菇" },
    rightItems: { emoji: "🍄", count: 7, label: "蘑菇" },
    unit: "只",
    answer: 13,
  },
  {
    id: 3,
    type: "addition",
    leftItems: { emoji: "🐟", count: 8, label: "鱼" },
    rightItems: { emoji: "🐟", count: 7, label: "鱼" },
    unit: "条",
    answer: 15,
  },
  {
    id: 4,
    type: "addition",
    leftItems: { emoji: "🌰", count: 9, label: "栗子" },
    rightItems: { emoji: "🌰", count: 4, label: "栗子" },
    unit: "个",
    answer: 13,
  },
  {
    id: 5,
    type: "addition",
    leftItems: { emoji: "🍃", count: 5, label: "叶子" },
    rightItems: { emoji: "🍃", count: 6, label: "叶子" },
    unit: "个",
    answer: 11,
  },
  {
    id: 6,
    type: "addition",
    leftItems: { emoji: "🌳", count: 3, label: "大树" },
    rightItems: { emoji: "🌳", count: 4, label: "大树" },
    unit: "只",
    answer: 7,
  },
]

export const categories = [
  { id: "math", name: "数学", icon: "🔢", color: "primary" as const },
  { id: "chinese", name: "语文", icon: "📖", color: "candy" as const },
  { id: "english", name: "英语", icon: "🌍", color: "ocean" as const },
  { id: "science", name: "科学", icon: "🔬", color: "forest" as const },
  { id: "art", name: "美术", icon: "🎨", color: "sunshine" as const },
  { id: "music", name: "音乐", icon: "🎵", color: "accent" as const },
]
