<template>
  <div class="heatmap_container">
    <span
      class="rect"
      v-for="(box, index) in datalist"
      :data-tooltip="getTooltip(box, index)"
      :style="{ 'background-color': setColor(box) }"
    >
      [[ box ]]
    </span>
  </div>
</template>

<script>
export default {
  props: {
    points: { type: Number, default: 12 },
    datalist: { type: Array, default: () => [] },
    max: {
      type: Number,
      default: 30,
    },
  },
  data: function () {
    return {
      colorval: [],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  mounted() {
    let raw = this;
    this.datalist.forEach(function (item) {
      raw.colorval.push(Number(item) / 30);
    });
  },
  methods: {
    setColor(val) {
      return "rgb(250," + Number(240 - (Number(val) / 30) * 255) + ",250)";
    },
    getTooltip(days, index) {
      return days + " days , " + this.months[index];
    },
  },
};
</script>

<style>
.rect {
  padding: 9px;
  /* height: 12px; */
  margin: 2px !important;
  /* background-color: grey; */
  font-size: 0 !important;
}

[data-tooltip] {
  position: relative;
  z-index: 2;
  cursor: pointer;
}

/* Hide the tooltip content by default */
[data-tooltip]:before,
[data-tooltip]:after {
  visibility: hidden;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);
  opacity: 0;
  pointer-events: none;
}

/* Position tooltip above the element */
[data-tooltip]:before {
  position: absolute;
  bottom: 150%;
  left: 50%;
  margin-bottom: 5px;
  margin-left: -80px;
  padding: 7px;
  width: 160px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background-color: #000;
  background-color: hsla(0, 0%, 20%, 0.9);
  color: #fff;
  content: attr(data-tooltip);
  text-align: center;
  font-size: 14px;
  line-height: 1.2;
}

/* Triangle hack to make tooltip look like a speech bubble */
[data-tooltip]:after {
  position: absolute;
  bottom: 150%;
  left: 50%;
  margin-left: -5px;
  width: 0;
  border-top: 5px solid #000;
  border-top: 5px solid hsla(0, 0%, 20%, 0.9);
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  content: " ";
  font-size: 0;
  line-height: 0;
}

/* Show tooltip content on hover */
[data-tooltip]:hover:before,
[data-tooltip]:hover:after {
  visibility: visible;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);
  opacity: 1;
}
</style>