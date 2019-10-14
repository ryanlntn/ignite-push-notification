const test = require("ava");
const sinon = require("sinon");
const plugin = require("../plugin");

test("removes PushNotification", async t => {
  const boilerplateName = sinon.stub().returns("ignite-andross");
  const removeModule = sinon.spy();
  const removePluginComponentExample = sinon.spy();
  const confirm = sinon.stub().returns(true);
  const remove = sinon.spy();

  const context = {
    ignite: { removeModule, removePluginComponentExample, boilerplateName },
    prompt: { confirm },
    filesystem: { remove }
  };

  await plugin.remove(context);

  t.true(
    removeModule.calledWith("react-native-push-notification", { unlink: true })
  );
  t.true(confirm.called);
  t.is(remove.args[0][0], `${process.cwd()}/App/Config/PushConfig.js`);
});
