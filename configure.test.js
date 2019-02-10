const { getAdapterModule } = require("./configure");

describe("getAdapterModule", () => {
  describe("detect", () => {
    test("works", () => {
      expect(
        getAdapterModule({
          dependencies: {
            react: "^16.8.1"
          }
        })
      ).toEqual("enzyme-adapter-react-16");
    });

    test("works for ORs", () => {
      expect(
        getAdapterModule({
          dependencies: {
            react: "^16.8.1 || ~16.9"
          }
        })
      ).toEqual("enzyme-adapter-react-16");
    });

    test("works for exact", () => {
      expect(
        getAdapterModule({
          dependencies: {
            react: "16.0.0"
          }
        })
      ).toEqual("enzyme-adapter-react-16.1");
    });

    test("works for 15", () => {
      expect(
        getAdapterModule({
          dependencies: {
            react: "^15.0"
          }
        })
      ).toEqual("enzyme-adapter-react-15");
    });

    test("works for 14", () => {
      expect(
        getAdapterModule({
          dependencies: {
            react: "^0.14"
          }
        })
      ).toEqual("enzyme-adapter-react-14");
    });

    test("fails for prerelease", () => {
      expect(() =>
        getAdapterModule({
          dependencies: {
            react: "16.0.0-0"
          }
        })
      ).toThrow(
        "Could not detect Enzyme adapter to use, please specify module as `enzymeAdapter` in `package.json`."
      );
    });

    test("fails for made up low version", () => {
      expect(() =>
        getAdapterModule({
          dependencies: {
            react: "^1"
          }
        })
      ).toThrow(
        "Could not detect Enzyme adapter to use, please specify module as `enzymeAdapter` in `package.json`."
      );
    });
  });

  describe("specify", () => {
    test("works", () => {
      expect(
        getAdapterModule({
          enzymeAdapter: "enzyme-made-up-adapter"
        })
      ).toEqual("enzyme-made-up-adapter");
    });
  });
});
