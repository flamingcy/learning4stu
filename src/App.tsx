import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { HomePage } from "@/pages/HomePage"
import { CoursesPage } from "@/pages/CoursesPage"
import { CourseDetailPage } from "@/pages/CourseDetailPage"
import { QuizPage } from "@/pages/QuizPage"
import { ReviewPage } from "@/pages/ReviewPage"

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/review" element={<ReviewPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
