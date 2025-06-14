import { Problem, ProblemDifficulty } from '../types/problem'
import { QuestionResp } from '../types/backend-types'

// 将后端题目数据转换为前端格式
export function adaptQuestionToProblem(question: QuestionResp): Problem {
  // 计算通过率
  const acceptanceRate = question.submitNum > 0 
    ? ((question.acceptNum / question.submitNum) * 100).toFixed(1) + '%'
    : '0%'

  // 转换难度
  const difficulty: ProblemDifficulty = 
    question.difficulty === 'EASY' ? 'Easy' :
    question.difficulty === 'MEDIUM' ? 'Medium' :
    question.difficulty === 'HARD' ? 'Hard' : 'Easy'

  return {
    id: question.id.toString(),
    title: question.title,
    difficulty,
    tags: question.tags.map(tag => tag.name),
    description: question.content.substring(0, 200) + '...', // 截取前200个字符作为描述
    details: question.content,
    submissionCount: question.submitNum,
    acceptanceCount: question.acceptNum,
    likes: question.thumbNum,
    favorites: question.favourNum,
    acceptanceRate,
    // 这些字段在后端API中没有，需要根据具体业务逻辑设置
    isFavorited: false,
    status: 'Todo',
    // 初始代码和解答代码需要从judgeCase或judgeConfig中解析
    initialCode: parseInitialCode(question.judgeConfig),
    solutionCode: parseSolutionCode(question.answer)
  }
}

// 解析初始代码（从judgeConfig中提取）
function parseInitialCode(judgeConfig: string): Problem['initialCode'] {
  try {
    const config = JSON.parse(judgeConfig || '{}')
    return {
      javascript: config.initialCode?.javascript || '',
      python: config.initialCode?.python || '',
      java: config.initialCode?.java || '',
      cpp: config.initialCode?.cpp || '',
      c: config.initialCode?.c || '',
      go: config.initialCode?.go || '',
      csharp: config.initialCode?.csharp || ''
    }
  } catch {
    return {}
  }
}

// 解析解答代码（从answer中提取）
function parseSolutionCode(answer: string): Problem['solutionCode'] {
  try {
    const solutionData = JSON.parse(answer || '{}')
    return {
      javascript: solutionData.javascript || '',
      python: solutionData.python || '',
      java: solutionData.java || '',
      cpp: solutionData.cpp || '',
      c: solutionData.c || '',
      go: solutionData.go || '',
      csharp: solutionData.csharp || ''
    }
  } catch {
    return {}
  }
}

// 将前端题目数据转换为后端格式
export function adaptProblemToQuestion(problem: Partial<Problem>, tagIds: number[] = []): Partial<QuestionResp> {
  const difficulty = 
    problem.difficulty === 'Easy' ? 'EASY' :
    problem.difficulty === 'Medium' ? 'MEDIUM' :
    problem.difficulty === 'Hard' ? 'HARD' : 'EASY'

  return {
    id: problem.id ? parseInt(problem.id) : undefined,
    title: problem.title || '',
    content: problem.details || '',
    difficulty,
    submitNum: problem.submissionCount || 0,
    acceptNum: problem.acceptanceCount || 0,
    thumbNum: problem.likes || 0,
    favourNum: problem.favorites || 0,
    // 这些字段需要根据具体需求设置
    answer: JSON.stringify(problem.solutionCode || {}),
    judgeConfig: JSON.stringify({
      initialCode: problem.initialCode || {},
      // 其他判题配置...
    }),
    judgeCase: '[]', // 需要根据具体测试用例设置
  }
} 