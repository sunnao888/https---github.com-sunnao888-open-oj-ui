import ProblemSolvingPageClient from "./ProblemSolvingPageClient"

// 移除静态参数生成，改为动态路由
export default function ProblemSolvingPage({ params }: { params: { id: string } }) {
  return <ProblemSolvingPageClient params={params} />
}
