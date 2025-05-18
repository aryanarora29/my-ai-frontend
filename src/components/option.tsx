
// // 📁 src/pages/option.tsx
// import ThemeToggler from "./ThemeToggler"
// import LanguageSelector from "./LanguageSelector"
// import { Button } from "./ui/button"
// import { useRouter } from "next/router"

// const options = [
//   "Option 1", "Option 2", "Option 3", "Option 4",
//   "Option 5", "Option 6", "Option 7", "Option 8"
// ]

// export default function OptionPage() {
//   const router = useRouter()

//   return (
//     <div className="min-h-screen bg-background text-foreground relative p-4">
//       {/* Header controls */}
//       <div className="absolute top-4 right-4 flex gap-3">
//         <ThemeToggler />
//         <LanguageSelector />
//       </div>

//       {/* Options Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pt-24">
//         {options.map((label, index) => (
//           <Button
//             key={index}
//             className="text-lg py-10 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
//             onClick={() => router.push(`/option/${index + 1}`)}
//           >
//             {label}
//           </Button>
//         ))}
//       </div>
//     </div>
//   )
// }
