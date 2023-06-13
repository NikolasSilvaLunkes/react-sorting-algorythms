import { useState, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [result, setResult] = useState({
    bubble: "0.00000",
    quick: "0.00000",
    merge: "0.00000",
    insertion: "0.00000",
    selection: "0.00000",
    heap: "0.00000",
    shell: "0.00000",
  })
const [listSize, setListSize] = useState(2);
const [, updateState] = useState();
const forceUpdate = useCallback(() => updateState({}), []);

const makeArray = () => {
  let arrayClone = [];
  for (let i = 0; i < listSize; i++) {
      arrayClone.push(Math.floor(Math.random() * 1000));
    }
  return arrayClone;
}



const testTime = (func,arr) => {
  let startTime = new Date();
  func(arr);
  let endTime = new Date();
  return endTime - startTime;
}

const handleClick = () => {
  let array = makeArray();
  let resultClone = result;
  resultClone.shell = testTime(shellSort,array).toString();
  resultClone.bubble = testTime(bubbleSort,array).toString();
  resultClone.selection = testTime(selectionSort,array).toString();
  resultClone.insertion = testTime(insertionSort,array).toString();
  resultClone.heap = testTime(heapSort,array).toString();
  resultClone.quick = testTime(quickSort,array).toString();
  resultClone.merge = testTime(mergeSort,array).toString();
  
  setResult(resultClone);
  forceUpdate();
}

function bubbleSort(arr) {
  
  for (var i = 0; i < arr.length; i++) {

      // Last i elements are already in place  
      for (var j = 0; j < (arr.length - i - 1); j++) {

          // Checking if the item at present iteration 
          // is greater than the next iteration
          if (arr[j] > arr[j + 1]) {

              // If the condition is true
              // then swap them
              var temp = arr[j]
              arr[j] = arr[j + 1]
              arr[j + 1] = temp
          }
      }
  }

  // Print the sorted array
  return arr;
}


function shellSort(arr) {
  let increment = arr.length / 2;
  while (increment > 0) {
      for (let i = increment; i < arr.length; i++) {
          let j = i;
          let temp = arr[i];
  
          while (j >= increment && arr[j-increment] > temp) {
              arr[j] = arr[j-increment];
              j = j - increment;
          }
  
          arr[j] = temp;
      }
  
      if (increment == 2) {
          increment = 1;
      } else {
          increment = parseInt(increment*5 / 11);
      }
  }
return arr;
}

function merge(left, right) { 
  let arr = [] 
  while (left.length && right.length) { 
    if (left[0] < right[0]) { 
      arr.push(left.shift()) 
    } else { 
      arr.push(right.shift()) 
    } 
  } 
  return [ ...arr, ...left, ...right ] 
} 

function mergeSort(array) { 
  const half = array.length / 2 
  if(array.length < 2){ 
    return array 
  } 
  const left = array.splice(0, half) 
  return merge(mergeSort(left),mergeSort(array)) 
} 

function partition(items, left, right) {
  let pivot   = items[Math.floor((right + left) / 2)], //middle element
      i       = left, //left pointer
      j       = right; //right pointer
  while (i <= j) {
      while (items[i] < pivot) {
          i++;
      }
      while (items[j] > pivot) {
          j--;
      }
      if (i <= j) {
          swapheap(items, i, j); //swap two elements
          i++;
          j--;
      }
  }
  return i;
}

function quickSorting(items, left, right) {
  let index;
  if (items.length > 1) {
      index = partition(items, left, right); //index returned from partition
      if (left < index - 1) { //more elements on the left side of the pivot
          quickSorting(items, left, index - 1);
      }
      if (index < right) { //more elements on the right side of the pivot
          quickSorting(items, index, right);
      }
  }
  return items;
}

function quickSort(items){
  return quickSorting(items, 0, items.length - 1);
}

function heap_root(input, i, array_length) { 
  let left = 2 * i + 1; 
  let right = 2 * i + 2; 
  let max = i; 
  if (left < array_length && input[left] > input[max]) { 
    max = left; 
  } 
  if (right < array_length && input[right] > input[max]) { 
    max = right; } if (max != i) { swapheap(input, i, max); heap_root(input, max); 
  } 
} 

function swapheap(input, index_A, index_B) { 
  let temp = input[index_A]; 
  input[index_A] = input[index_B]; 
  input[index_B] = temp; 
} 

function heapSort(input) { 
  let array_length = input.length; 
  for (let i = Math.floor(array_length / 2); i >= 0; i -= 1) { 
    heap_root(input, i, array_length); 
  } 
  for (let i = input.length - 1; i > 0; i--) { 
    swapheap(input, 0, i); array_length--; heap_root(input, 0); 
  } 
} 



function insertionSort(arr){
  for(let i = 1; i < arr.length;i++){
      for(let j = i - 1; j > -1; j--){
          if(arr[j + 1] < arr[j]){
              [arr[j+1],arr[j]] = [arr[j],arr[j + 1]];
          }
      }
  };
  return arr;
}

function selectionSort(arr) {
  let min;
  for (let i = 0; i < arr.length; i++) {
    min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }
  return arr;
}


  return (
    <>
      <div>
        <p>Tamanho da lista</p>
        <input value={listSize} type="number"
        onChange={e => setListSize(e.target.value)} /><br />
        <button onClick={handleClick}>Realizar o Benchmark</button>
        <p>Bubble: {...result.bubble}</p>
        <p>Quick: {...result.quick}</p>
        <p>Merge: {...result.merge}</p>
        <p>Insertion: {...result.insertion}</p>
        <p>Selection: {...result.selection}</p>
        <p>Heap: {...result.heap}</p>
        <p>Shell: {...result.shell}</p>
      </div>
    </>
  )
}

export default App
