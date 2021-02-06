import {InfoHelper} from "../src";

jest.mock("../src/utils/network");

let userId = "";
let password = "";
let dormPassword = "";
let emailName = "";

try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const secrets = require("../secrets.json");
    userId = secrets.userId;
    password = secrets.password;
    dormPassword = secrets.dormPassword;
    emailName = secrets.emailName;
} catch (e) {
    userId = process.env.INFO_USER_ID!;
    password = process.env.INFO_PASSWORD!;
    dormPassword = process.env.INFO_DORM_PASSWORD!;
    emailName = process.env.INFO_EMAIL_NAME!;
}

it("Login test", async () => {
    jest.setTimeout(20000);
    const helper = new InfoHelper();
    await helper.login({userId, password, dormPassword}, () => {}, false);
    expect(helper.emailName).toEqual(emailName);
});