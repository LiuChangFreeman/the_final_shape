import {Toast} from "antd-mobile";
import {initializeIcons} from '@uifabric/icons';

initializeIcons("./icons/fonts/");

export default {

  namespace: 'util',

  state: {},

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(
        async (location) => {

        })
    }
  },

  effects: {},

  reducers: {}
};
