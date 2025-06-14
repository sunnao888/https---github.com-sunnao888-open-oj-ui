import type { Problem } from "@/types/problem"

const twoSumInitialCode = {
  javascript: `/**
* @param {number[]} nums
* @param {number} target
* @return {number[]}
*/
var twoSum = function(nums, target) {
    
};`,
  python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        pass`,
  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
  c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize){

}`,
  cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
  go: `func twoSum(nums []int, target int) []int {
    
}`,
}

const twoSumSolutionCode = {
  javascript: `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
};`,
  python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        numMap = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in numMap:
                return [numMap[complement], i]
            numMap[num] = i
        return []`,
  // Add other language solutions if available
}

const BASE_MOCK_PROBLEMS: Problem[] = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    details: `
      <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers</em> such that they add up to <code>target</code>.</p>
      <p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>
      <p>You can return the answer in any order.</p>
      <br/>
      <p><strong>Example 1:</strong></p>
      <pre>
<strong>Input:</strong> nums = [2,7,11,15], target = 9
<strong>Output:</strong> [0,1]
<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
      </pre>
      <p><strong>Example 2:</strong></p>
      <pre>
<strong>Input:</strong> nums = [3,2,4], target = 6
<strong>Output:</strong> [1,2]
      </pre>
      <p><strong>Example 3:</strong></p>
      <pre>
<strong>Input:</strong> nums = [3,3], target = 6
<strong>Output:</strong> [0,1]
      </pre>
      <br/>
      <p><strong>Constraints:</strong></p>
      <ul>
        <li><code>2 <= nums.length <= 10<sup>4</sup></code></li>
        <li><code>-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup></code></li>
        <li><code>-10<sup>9</sup> <= target <= 10<sup>9</sup></code></li>
        <li><strong>Only one valid answer exists.</strong></li>
      </ul>
    `,
    initialCode: twoSumInitialCode,
    solutionCode: twoSumSolutionCode,
    submissionCount: 1500000,
    acceptanceCount: 700000,
    likes: 25000,
    favorites: 5000,
    isFavorited: false,
    status: "Todo",
  },
  {
    id: "2",
    title: "Add Two Numbers",
    difficulty: "Medium",
    tags: ["Linked List", "Math", "Recursion"],
    description:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    details: `
      <p>You are given two <strong>non-empty</strong> linked lists representing two non-negative integers. The digits are stored in <strong>reverse order</strong>, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.</p>
      <p>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p>
    `,
    initialCode: {
      javascript: `/**
* Definition for singly-linked list.
* function ListNode(val, next) {
*     this.val = (val===undefined ? 0 : val)
*     this.next = (next===undefined ? null : next)
* }
*/
/**
* @param {ListNode} l1
* @param {ListNode} l2
* @return {ListNode}
*/
var addTwoNumbers = function(l1, l2) {
    
};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        pass`,
    },
    submissionCount: 1200000,
    acceptanceCount: 450000,
    likes: 18000,
    favorites: 3000,
    isFavorited: true,
    status: "Attempted",
  },
  {
    id: "3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Sliding Window"],
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    details: `<p>Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p>`,
    initialCode: {
      javascript: `var lengthOfLongestSubstring = function(s) {};`,
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        pass`,
    },
    submissionCount: 2000000,
    acceptanceCount: 600000,
    likes: 30000,
    favorites: 7000,
    status: "Solved",
  },
  {
    id: "4",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    details: `<p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return <strong>the median</strong> of the two sorted arrays.</p>`,
    initialCode: {
      javascript: `var findMedianSortedArrays = function(nums1, nums2) {};`,
      python: `class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        pass`,
    },
    submissionCount: 1000000,
    acceptanceCount: 350000,
    likes: 15000,
    favorites: 2500,
    status: "Todo",
  },
  {
    id: "5",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    tags: ["String", "Dynamic Programming"],
    description: "Given a string s, return the longest palindromic substring in s.",
    details: `<p>Given a string <code>s</code>, return <em>the longest palindromic substring</em> in <code>s</code>.</p>`,
    initialCode: {
      javascript: `var longestPalindrome = function(s) {};`,
      python: `class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        pass`,
    },
    submissionCount: 900000,
    acceptanceCount: 300000,
    likes: 12000,
    favorites: 2000,
    status: "Attempted",
  },
]

const MOCK_PROBLEMS_EXPANDED: Problem[] = []
const NUM_DUPLICATIONS = 5

for (let i = 0; i < NUM_DUPLICATIONS; i++) {
  BASE_MOCK_PROBLEMS.forEach((problem, index) => {
    const newId = `${problem.id}-${i}`
    // 使用固定的偏移量而不是随机数，确保服务器和客户端渲染一致
    const baseOffset = index * 123 + i * 456 // 固定的计算方式
    const submissionOffset = (baseOffset % 5000)
    const acceptanceOffset = (baseOffset % 2500)
    const likesOffset = (baseOffset % 50)
    const favoritesOffset = (baseOffset % 25)
    
    MOCK_PROBLEMS_EXPANDED.push({
      ...problem,
      id: newId,
      title: `${problem.title} (v${i + 1})`,
      // Keep initialCode and solutionCode, or vary them if needed
      submissionCount: Math.max(0, problem.submissionCount - i * 10000 - submissionOffset),
      acceptanceCount: Math.max(0, problem.acceptanceCount - i * 5000 - acceptanceOffset),
      likes: Math.max(0, problem.likes - i * 100 - likesOffset),
      favorites: Math.max(0, problem.favorites - i * 50 - favoritesOffset),
      status: i % 3 === 0 ? "Todo" : i % 3 === 1 ? "Attempted" : "Solved",
      isFavorited: i % 2 === 0 ? problem.isFavorited : !problem.isFavorited,
    })
  })
}

export const PROBLEMS_WITH_STATS: Problem[] = MOCK_PROBLEMS_EXPANDED.map((problem) => ({
  ...problem,
  acceptanceRate:
    problem.submissionCount > 0 ? ((problem.acceptanceCount / problem.submissionCount) * 100).toFixed(1) + "%" : "N/A",
}))
