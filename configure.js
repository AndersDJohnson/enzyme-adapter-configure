const mappings = [
  ["enzyme-adapter-react-16", "^16.4.0-0"],
  ["enzyme-adapter-react-16.3", "~16.3.0-0"],
  ["enzyme-adapter-react-16.2", "~16.2"],
  // ["enzyme-adapter-react-16.1", "~16.0.0-0 || ~16.1"],
  ["enzyme-adapter-react-16.1", "~16.0.0 || ~16.1"],
  ["enzyme-adapter-react-15", "^15.5.0"],
  // ["enzyme-adapter-react-15.4", "15.0.0-0 - 15.4.x"],
  ["enzyme-adapter-react-15.4", "15.0.0 - 15.4.x"],
  ["enzyme-adapter-react-14", "^0.14.0"],
  ["enzyme-adapter-react-13", "^0.13.0"]
];

const getAdapterModule = pkg => {
  const adapterInPacakge = pkg && pkg.enzymeAdapter;

  if (adapterInPacakge) return adapterInPacakge;

  const deps = Object.assign(
    {},
    pkg.dependencies,
    pkg.peerDependencies,
    pkg.devDependencies
  );

  if (deps.react) {
    const semver = require("semver");

    const mapping = mappings.find(mapping => {
      return semver.intersects(deps.react, mapping[1]);
    });

    if (mapping) return mapping[0];
  }

  throw new Error(
    "Could not detect Enzyme adapter to use, please specify module as `enzymeAdapter` in `package.json`."
  );
};

const withPkg = pkg => {
  const Enzyme = require("enzyme");

  const adapterModule = getAdapterModule(pkg);

  const EnzymeAdapter = require(adapterModule);

  Enzyme.configure({ adapter: new EnzymeAdapter() });
};

const run = () => {
  const readPkgUp = require("read-pkg-up");

  const result = readPkgUp.sync();
  withPkg(result && result.pkg);
};

run.getAdapterModule = getAdapterModule;

module.exports = run;
