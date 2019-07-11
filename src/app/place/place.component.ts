import { Component, OnInit } from '@angular/core';
import * as L7 from '@antv/l7';

@Component({
	selector: 'app-place',
	templateUrl: './place.component.html',
	styleUrls: ['./place.component.less']
})
export class PlaceComponent implements OnInit {

	constructor() { }

	ngOnInit() {

		// 初始化 场景
        const scene = new L7.Scene({
            id: 'map',
            mapStyle: 'light',
            // center: [100, 32],
            pitch: 0,
            zoom: 4
        });

        

      //   scene.PointLayer({zIndex: 2 })
		    // .source(data.list, {type: 'array', x: 'j', y: 'w', })
		    // .shape('cylinder')
		    // .size('t',(level)=> {return [4,4,(level+40)]; })
		    // .active(true)
		    // .color('t', ["#002466","#105CB3","#2894E0","#CFF6FF","#FFF5B8","#FFAB5C","#F27049","#730D1C"])
		    // .render();
	


	}

}
