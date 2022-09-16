import {hasPower} from "@utils/tool.js"
export default {
    methods: {
        hasPower(type) {
            return hasPower(this.$route.name, type)
        }
    }
}