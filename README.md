# interpolate array


```javascript
interpolate([0, 1, 2, 4, 5])
// => [[0, 1, 2, 3, 4, 5], 1]

interpolate([0, 4, 16, 20])
// => [[0, 4, 8, 12, 16, 20], 4]

interpolate([0, 4, 14, 20])
// => [[2, 4, 6, 8, 10, 12, 14, 16, 18, 20], 2]

interpolate([{x: 0}, {x: 4}, {x: 16}, {x: 20}])
// => [[{x: 0}, {x: 4}, {x: 8}, {x: 12}, {x: 16}, {x: 20}], 4]

interpolate([{time: 0}, {time: 4}, {time: 16}, {time: 20}], {index: 'time'})
// => [[{time: 0}, {time: 4}, {time: 8}, {time: 12}, {time: 16}, {time: 20}], 4]

interpolate([{x: 0, v: 2}, {x: 4, v: 6}, {x: 16, v: 12}, {x: 20, v: 4}])
// => [[{x:0,v:2},{x:4,v:6},{x:8,v:8},{x:12,v:10},{x:16,v:12},{x:20,v:4}], 4]

// fill default value
interpolate([{x: 0, v: 2}, {x: 4, v: 6}, {x: 16, v: 12}, {x: 20, v: 4}], {defaults: {v: 0}})
// => [[{x:0,v:2},{x:4,v:6},{x:8,v:0},{x:12,v:0},{x:16,v:12},{x:20,v:4}],4]

```

# TODO

Write more test...

# Author

Muddy Dixon muddydixon@gmail.com

# License

Copyright 2013- Muddy Dixon (muddydixon)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

