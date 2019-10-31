import Vue from "vue";
import { Button, Divider, MessageBox, Message } from "element-ui";

Vue.use(Button);
Vue.use(Divider);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
