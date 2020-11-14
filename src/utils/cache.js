import { hasOwnProperty } from "./object";

export const makePropWatcher = propName => ({
  handler(newVal, oldVal) {
    for (const key in oldVal) {
      if (!hasOwnProperty(newVal, key)) {
        this.$delete(this.$data[propName], key);
      }
    }
    for (const key in newVal) {
      this.$set(this.$data[propName], key, newVal[key]);
    }
  }
});

export const makePropCacheMixin = (propName, proxyPropName) => ({
  data() {
    return {
      [proxyPropName]: {}
    };
  },
  watch: {
    [propName]: makePropWatcher(proxyPropName)
  },
  created() {
    this[proxyPropName] = { ...this[propName] };
  }
});
