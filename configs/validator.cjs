const path = require("path");

const programDir = path.join(__dirname, "..", "programs");

function getProgram(programBinary) {
  return path.join(programDir, ".bin", programBinary);
}

module.exports = {
  validator: {
    commitment: "processed",
    programs: [
      {
        label: "Umi T22",
        programId: "MyProgram1111111111111111111111111111111111",
        deployPath: getProgram("umi_t22_program.so")
      },
      // Below are external programs that should be included in the local validator.
      // You may configure which ones to fetch from the cluster when building
      // programs within the `configs/program-scripts/dump.sh` script.
      {
        label: "Token Metadata",
        programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
        deployPath: getProgram("mpl_token_metadata.so")
      },
      {
        label: "SPL Noop",
        programId: "noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV",
        deployPath: getProgram("spl_noop.so")
      },
      {
        label: "System Extras",
        programId: "SysExL2WDyJi9aRZrXorrjHJut3JwHQ7R9bTyctbNNG",
        deployPath: getProgram("mpl_system_extras.so")
      },
      {
        label: "Token Extras",
        programId: "TokExjvjJmhKaRBShsBAsbSvEWMA1AgUNK7ps4SAc2p",
        deployPath: getProgram("mpl_token_extras.so")
      },
      {
        label: "SPL Token-2022",
        programId: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
        deployPath: getProgram("spl_token_2022.so")
      }
    ]
  }
};
