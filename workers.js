function minCostToHireWorkers(quality, wage, cost) {
    const n = quality.length;
    const workers = [];
    for (let i = 0; i < n; i++) {
      workers.push([quality[i], wage[i]]);
    }
    workers.sort((a, b) => a[1] / a[0] - b[1] / b[0]);   
    let totalCost = 0;
    const heap = []; 
    let maxQuality = 0;
    for (let i = 0; i < n; i++) {
      const [q, w] = workers[i];
      totalCost += w;
      heap.push(q);
      if (heap.length > 1) {
        maxQuality += heap.pop();
      }
      if (heap.length > 0) {
        const expectedWage = (maxQuality / heap.length) * (w / q);
        if (expectedWage < cost) {
          maxQuality -= heap.pop();
          totalCost -= w;
          i--; 
        }
      }
    }
    return heap.length === 0 ? Math.floor(totalCost / cost) : 0;
  }
  