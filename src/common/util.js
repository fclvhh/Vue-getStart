export default {
  swapArray(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  },
  // 数组元素位置的前移
  moveUp(arr, index) {
    this.swapArray(arr, index, index - 1)
  },
  moveDown(arr, index) {
    this.swapArray(arr, index, index + 1)
  }
}
