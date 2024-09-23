/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function(times, n, k) {
    
    const graph = new Map();
    for (let i = 1; i <= n; i++) {
        graph.set(i, []);
    }
    for (const [u, v, w] of times) {
        graph.get(u).push([v, w]);
    }
    
    const dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;  
    
    const minHeap = [[0, k]];  

    while (minHeap.length > 0) {
        const [currentDist, u] = minHeap.shift();
       
        if (graph.has(u)) {
            for (const [v, w] of graph.get(u)) {
                const newDist = currentDist + w;
                
                if (newDist < dist[v]) {
                    dist[v] = newDist;
                    minHeap.push([newDist, v]);                 
                    minHeap.sort((a, b) => a[0] - b[0]);
                }
            }
        }
    }
   
    let result = Math.max(...dist.slice(1)); 
    return result === Infinity ? -1 : result;
};
