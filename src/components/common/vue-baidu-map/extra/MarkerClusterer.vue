<template>
<span>
  <slot></slot>
</span>  
</template>

<script>
import MarkerClusterer from './src/MarkerClusterer.js'
import {createSize} from '../base/factory.js'
import commonMixin from '../base/mixins/common.js'

export default {
  name: 'bml-marker-clusterer',
  mixins: [commonMixin('markerClusterer')],
  props: {
    gridSize: {
      type: Object
    },
    maxZoom: {
      type: Number
    },
    minClusterSize: {
      type: Object
    },
    styles: {
      type: Array,
      default () {
        return []
      }
    },
    averageCenter: {
      type: Boolean,
      default: false
    },
    points: {
      type: Array,
      default () {
        return []
      }
    },
  },
  watch: {
    gridSize: {
      handler (val) {
        const {BMap, originInstance} = this
        originInstance.setGridSize(BMap, val.map)
      },
      deep: true
    },
    maxZoom (val) {
      const {originInstance} = this
      originInstance.setMaxZoom(val)
    },
    minClusterSize: {
      handler (val) {
        const {BMap, originInstance} = this
        originInstance.setMinClusterSize(createSize(BMap, val))
      },
      deep: true
    },
    styles: {
      handler (val) {
        const {BMap, originInstance} = this
        const obj = JSON.parse(JSON.stringify(val)).map(item => {
          item.size = item.size && createSize(BMap, item.size)
          return item
        })
        originInstance.setStyles(obj)
      },
      deep: true
    },
    points: {
      handler (val) {
        this.addCluster();
      },
      deep: true
    },
    averageCenter (val) {
      this.reload()
    }
  },
  methods: {
    load () {
      const {BMap, map, gridSize, minClusterSize, maxZoom, styles, averageCenter} = this
      this.originInstance = new MarkerClusterer(map, {
        gridSize: gridSize && createSize(BMap, gridSize),
        maxZoom,
        minClusterSize: minClusterSize && createSize(BMap, minClusterSize),
        styles: styles.map(item => {
          item.size = createSize(BMap, item.size)
          return item
        }),
        isAverageCenter: averageCenter
      })
      this.$nextTick(() => {
        const markers = this.$children.map(inst => inst.originInstance).filter(marker => marker instanceof BMap.Marker)
        this.originInstance.addMarkers(markers)
      })
      this.addCluster();
    },
    addCluster(){
    	const {BMap,points} = this;
    	const markers = [];
	    for (var i = 0; i < points.length; i++) {
	        markers.push( new BMap.Marker(new BMap.Point(points[i].lng, points[i].lat)) )
	    }
	    this.originInstance.addMarkers(markers)
    }
  },
  beforeCreate () {
    this.preventChildrenRender = true
  }
}
</script>
