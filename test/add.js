const test = require("ava");
const sinon = require("sinon");
const plugin = require("../plugin");

test("adds the proper npm module and component example", async t => {
  // spy on few things so we know they're called
  const addModule = sinon.spy();
  const addPluginComponentExample = sinon.spy();
  const boilerplateName = sinon.stub().returns("ignite-andross");
  const exists = sinon.stub().returns(false);
  const write = sinon.spy();

  // mock a context
  const context = {
    ignite: { addModule, addPluginComponentExample, boilerplateName },
    filesystem: { exists, write }
  };

  await plugin.add(context);

  t.true(
    addModule.calledWith("react-native-push-notification", {
      link: true,
      version: "^3.1.9"
    })
  );
  t.true(exists.called);
  t.true(write.called);
});
