import { parseReadme } from "~/utils";
import NlyDocsMain from "../../components/nly-docs-main";
import NlyDocsQuickLinks from "../../components/NlyDocsQuickLinks";
import NlyDocsSection from "~/components/nly-docs-section";
import docsMixin from "~/plugins/docs-mixin";
import {
  defaultConfig,
  nuxtVersion,
  popperVersion,
  portalVueVersion,
  version,
  vueVersion,
  overlayscrollbarsVersion,
  overlayscrollbarsVueVersion,
  lodashClonedeepVersion
} from "~/content";
import meta from "~/markdown/intro/meta.json";
import readme from "~/markdown/intro/README.md";

const { titleLead, body } = parseReadme(readme);

// RegExp to grab the minor version from a full version
const minorRE = /^(\d+\.\d+)(\..+)$/;
// RegExp to grab the major version from a full version
const majorRE = /^(\d+)(\.\d+\..+)$/;

// @vue/component
export default {
  name: "BDVDocs",
  layout: "docs",
  components: {
    NlyDocsMain,
    NlyDocsQuickLinks,
    NlyDocsSection
  },
  mixins: [docsMixin],
  data() {
    return {
      //   bootstrapVersion,
      //   bootstrapVersionMinor: bootstrapVersion.replace(minorRE, "$1"),
      //   bootstrapVersionMajor: bootstrapVersion.replace(majorRE, "$1"),
      defaultConfig,
      nuxtVersion,
      nuxtVersionMinor: nuxtVersion.replace(minorRE, "$1"),
      nuxtVersionMajor: nuxtVersion.replace(majorRE, "$1"),
      popperVersion,
      popperVersionMinor: popperVersion.replace(minorRE, "$1"),
      popperVersionMajor: popperVersion.replace(majorRE, "$1"),
      portalVueVersion,
      portalVueVersionMinor: portalVueVersion.replace(minorRE, "$1"),
      portalVueVersionMajor: portalVueVersion.replace(majorRE, "$1"),
      overlayscrollbarsVersion,
      overlayscrollbarsVersionMinor: overlayscrollbarsVersion.replace(
        minorRE,
        "$1"
      ),
      overlayscrollbarsVersionMajor: overlayscrollbarsVersion.replace(
        majorRE,
        "$1"
      ),
      overlayscrollbarsVueVersion,
      overlayscrollbarsVueVersionMinor: overlayscrollbarsVueVersion.replace(
        minorRE,
        "$1"
      ),
      overlayscrollbarsVueVersionMajor: overlayscrollbarsVueVersion.replace(
        majorRE,
        "$1"
      ),
      lodashClonedeepVersion,
      lodashClonedeepVersionMinor: lodashClonedeepVersion.replace(
        minorRE,
        "$1"
      ),
      lodashClonedeepVersionMajor: lodashClonedeepVersion.replace(
        majorRE,
        "$1"
      ),
      titleLead,
      body,
      readme,
      version,
      vueVersion,
      vueVersionMinor: vueVersion.replace(minorRE, "$1"),
      vueVersionMajor: vueVersion.replace(majorRE, "$1")
    };
  },
  computed: {
    // hrefBootstrapBrowserDevices() {
    //   const minorVersion = this.bootstrapVersionMinor;
    //   return `//getbootstrap.com/docs/${minorVersion}/getting-started/browsers-devices`;
    // },
    meta() {
      return meta;
    }
  },
  // We use a string template here so that the docs README can do interpolation
  template: `
    <NlyDocsMain>
      <NlyDocsSection tag="header">${titleLead}</NlyDocsSection>
      <NlyDocsQuickLinks key="quick-/docs"></NlyDocsQuickLinks>
      <NlyDocsSection>${body}</NlyDocsSection>
    </NlyDocsMain>`
};
