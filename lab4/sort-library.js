const SortLib = (() => {

    function preprocessArray(arr) {
        let undefinedCount = 0;
        const validElements = [];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                undefinedCount++;
            } else {
                validElements.push(arr[i]);
            }
        }

        if (undefinedCount > 0) {
            console.warn(`[Аналіз масиву] Виявлено розріджений масив! Знайдено undefined-елементів: ${undefinedCount}`);
        }

        return { validElements, undefinedCount, originalLength: arr.length };
    }

    function postprocessArray(sortedValid, undefinedCount) {
        const result = [...sortedValid];
        for (let i = 0; i < undefinedCount; i++) {
            result.push(undefined);
        }
        return result;
    }

    function shouldSwap(a, b, asc) {
        return asc ? a > b : a < b;
    }

    return {
    
        bubbleSort: function(inputArr, asc = true) {
            const { validElements, undefinedCount } = preprocessArray(inputArr);
            let n = validElements.length;
            let comparisons = 0;
            let swaps = 0;

            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - i - 1; j++) {
                    comparisons++;
                    if (shouldSwap(validElements[j], validElements[j + 1], asc)) {
                        let temp = validElements[j];
                        validElements[j] = validElements[j + 1];
                        validElements[j + 1] = temp;
                        swaps++;
                    }
                }
            }

            console.log(`[Bubble Sort] Операцій порівняння: ${comparisons}, переміщень/обмінів: ${swaps}`);
            return postprocessArray(validElements, undefinedCount);
        },


        selectionSort: function(inputArr, asc = true) {
            const { validElements, undefinedCount } = preprocessArray(inputArr);
            let n = validElements.length;
            let comparisons = 0;
            let swaps = 0;

            for (let i = 0; i < n - 1; i++) {
                let targetIdx = i;
                for (let j = i + 1; j < n; j++) {
                    comparisons++;
                    if (shouldSwap(validElements[targetIdx], validElements[j], asc)) {
                        targetIdx = j;
                    }
                }
                if (targetIdx !== i) {
                    let temp = validElements[i];
                    validElements[i] = validElements[targetIdx];
                    validElements[targetIdx] = temp;
                    swaps++;
                }
            }

            console.log(`[Selection Sort] Операцій порівняння: ${comparisons}, переміщень/обмінів: ${swaps}`);
            return postprocessArray(validElements, undefinedCount);
        },

        insertionSort: function(inputArr, asc = true) {
            const { validElements, undefinedCount } = preprocessArray(inputArr);
            let n = validElements.length;
            let comparisons = 0;
            let swaps = 0;

            for (let i = 1; i < n; i++) {
                let key = validElements[i];
                let j = i - 1;

           
                while (j >= 0) {
                    comparisons++;
                    const condition = asc ? (validElements[j] > key) : (validElements[j] < key);
                    if (condition) {
                        validElements[j + 1] = validElements[j];
                        swaps++;
                        j--;
                    } else {
                        break;
                    }
                }
                validElements[j + 1] = key;
              
                if (j + 1 !== i) swaps++; 
            }

            console.log(`[Insertion Sort] Операцій порівняння: ${comparisons}, переміщень/обмінів: ${swaps}`);
            return postprocessArray(validElements, undefinedCount);
        },

    
        shellSort: function(inputArr, asc = true) {
            const { validElements, undefinedCount } = preprocessArray(inputArr);
            let n = validElements.length;
            let comparisons = 0;
            let swaps = 0;

            for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
                for (let i = gap; i < n; i++) {
                    let temp = validElements[i];
                    let j = i;

                    while (j >= gap) {
                        comparisons++;
                        const condition = asc ? (validElements[j - gap] > temp) : (validElements[j - gap] < temp);
                        if (condition) {
                            validElements[j] = validElements[j - gap];
                            swaps++;
                            j -= gap;
                        } else {
                            break;
                        }
                    }
                    validElements[j] = temp;
                    if (j !== i) swaps++;
                }
            }

            console.log(`[Shell Sort] Операцій порівняння: ${comparisons}, переміщень/обмінів: ${swaps}`);
            return postprocessArray(validElements, undefinedCount);
        },

      
        quickSort: function(inputArr, asc = true) {
            const { validElements, undefinedCount } = preprocessArray(inputArr);
            let comparisons = 0;
            let swaps = 0;

            function quickSortHelper(arr, low, high) {
                if (low < high) {
                    let pi = partition(arr, low, high);
                    quickSortHelper(arr, low, pi);
                    quickSortHelper(arr, pi + 1, high);
                }
            }

            function partition(arr, low, high) {
               
                let pivot = arr[Math.floor((low + high) / 2)];
                let i = low - 1;
                let j = high + 1;

                while (true) {
                    do {
                        i++;
                        comparisons++;
                    } while (asc ? arr[i] < pivot : arr[i] > pivot);

                    do {
                        j--;
                        comparisons++;
                    } while (asc ? arr[j] > pivot : arr[j] < pivot);

                    if (i >= j) return j;

                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    swaps++;
                }
            }

            quickSortHelper(validElements, 0, validElements.length - 1);
            console.log(`[Quick Sort] Операцій порівняння: ${comparisons}, переміщень/обмінів: ${swaps}`);
            return postprocessArray(validElements, undefinedCount);
        }
    };
})();
