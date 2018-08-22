class TrainMap {
	constructor() {
		this.map = [
			[-1, 5, -1, 5, 7],
			[-1, -1, 4, -1, -1],
			[-1, -1, -1, 8, 2],
			[-1, -1, 8, -1, 6],
			[-1, 3, -1, -1, -1]
		];
	}
	bfs(start, end, hops) {
		let lastRoute = start;
		let arr = ['A', 'B', 'C', 'D', 'E'];
		for (let hop = 0; hop < hops; hop++) {
			let route = "";
			for (let i = 0; i < lastRoute.length; i++) {
				let c = lastRoute[i];
				let id = arr.indexOf(c);
				console.log('lastRoute',lastRoute);
				for (let j = 0; j < this.map[id].length; j++) {
					if (this.map[id][j] > 0)
						route = route + (j + 'A');
				}
			}
			//          System.out.println(lastRoute);
			lastRoute = route;
		}

		//      System.out.println(lastRoute);
		console.log(lastRoute.split(end).length - 1);
	}


}

let g = new TrainMap();

g.bfs("A", "C", 4);