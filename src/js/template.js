
const wending = {
    fangkuai:[
        [0,0],[0,1],
        [1,0],[1,1]
    ],
    fengchao:[
        [0,1],[0,2],
        [1,0],[1,3],
        [2,1],[2,2]
    ]
}
const zhendang = {
    honglvdeng:[
        [0,0],[0,1],[0,2]
    ],
    wa:[
        [0,1],[0,2],[0,3],
        [1,0],[1,1],[1,2]
    ]
}
const yidong = {
    huaxiangji:[
        [0,1],
        [1,2],
        [2,0],[2,1],[2,2]
    ],
    //轻型飞船
    qxfc:[
      [0,1],[0,4],
      [1,0],
      [2,0],[2,4],
      [3,0],[3,1],[3,2],[3,3]
    ],
    zxfc:[
        [0,10],
        [1,8],[1,9],[1,10],[1,12],[1,13],[1,14],
        [2,7],[2,8],[2,15],
        [3,2],[3,6],[3,9],[3,13],[3,14],
        [4,1],[4,2],[4,3],[4,4],
        [5,0],[5,4],
        [6,1],[6,3],[6,6],
        [7,5]
    ]
}
export {
    wending,
    zhendang,
    yidong
}