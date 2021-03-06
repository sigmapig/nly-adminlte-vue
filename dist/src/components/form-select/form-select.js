import Vue from "../../utils/vue";
import { from as arrayFrom, isArray } from "../../utils/array";
import { attemptBlur, attemptFocus } from "../../utils/dom";
import { htmlOrText } from "../../utils/html";
import formCustomMixin from "../../mixins/form/form-custom";
import formMixin from "../../mixins/form/form";
import formSizeMixin from "../../mixins/form/form-size";
import formStateMixin from "../../mixins/form/form-valid";
import idMixin from "../../mixins/id";
import normalizeSlotMixin from "../../mixins/normalize-slot";
import optionsMixin from "./helpers/mixin-options";
import { NlyFormSelectOption } from "./form-select-option";
import { NlyFormSelectOptionGroup } from "./form-select-option-group";

export const NlyFormSelect = Vue.extend({
  name: "NlyFormSelect",
  mixins: [
    idMixin,
    normalizeSlotMixin,
    formMixin,
    formSizeMixin,
    formStateMixin,
    formCustomMixin,
    optionsMixin
  ],
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: {
      // type: [Object, Array, String, Number, Boolean],
      // default: undefined
    },
    multiple: {
      type: Boolean,
      default: false
    },
    selectSize: {
      type: Number,
      default: 0
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      localValue: this.value
    };
  },
  computed: {
    computedSelectSize() {
      // Custom selects with a size of zero causes the arrows to be hidden,
      // so dont render the size attribute in this case
      return !this.plain && this.selectSize === 0 ? null : this.selectSize;
    },
    inputClass() {
      return [
        this.plain ? "form-control" : "custom-select",
        this.size && this.plain ? `form-control-${this.size}` : null,
        this.size && !this.plain ? `custom-select-${this.size}` : null,
        this.validClass
      ];
    },
    computedAriaInvalid() {
      if (this.ariaInvalid === true || this.ariaInvalid === "true") {
        return "true";
      }
      return this.validClass === "is-invalid" ? "true" : null;
    }
  },
  watch: {
    value(newVal) {
      this.localValue = newVal;
    },
    localValue() {
      this.$emit("input", this.localValue);
    }
  },
  methods: {
    focus() {
      attemptFocus(this.$refs.input);
    },
    blur() {
      attemptBlur(this.$refs.input);
    },
    onChange(evt) {
      const { target } = evt;
      const selectedVal = arrayFrom(target.options)
        .filter(o => o.selected)
        .map(o => ("_value" in o ? o._value : o.value));
      this.localValue = target.multiple ? selectedVal : selectedVal[0];
      this.$nextTick(() => {
        this.$emit("change", this.localValue);
      });
    }
  },
  render(h) {
    const {
      name,
      disabled,
      required,
      computedSelectSize: size,
      localValue: value
    } = this;

    const $options = this.formOptions.map((option, index) => {
      const { value, label, options, disabled } = option;
      const key = `option_${index}`;

      return isArray(options)
        ? h(NlyFormSelectOptionGroup, { props: { label, options }, key })
        : h(NlyFormSelectOption, {
            props: { value, disabled },
            domProps: htmlOrText(option.html, option.text),
            key
          });
    });
    return h(
      "select",
      {
        class: this.inputClass,
        attrs: {
          id: this.safeId(),
          name,
          form: this.form || null,
          multiple: this.multiple || null,
          size,
          disabled,
          required,
          "aria-required": required ? "true" : null,
          "aria-invalid": this.computedAriaInvalid
        },
        on: { change: this.onChange },
        directives: [{ name: "model", value }],
        ref: "input"
      },
      [this.normalizeSlot("first"), $options, this.normalizeSlot("default")]
    );
  }
});
