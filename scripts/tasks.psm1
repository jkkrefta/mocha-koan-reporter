function PrintLine
  {
    '=============================='
  }

function PrintEmptyLine
  {
    ''
  }

function RunPSProcess ($Command, $Path)
  {
    Start-Process 'powershell' -ArgumentList @($Command) -WorkingDirectory $Path -Wait -NoNewWindow
  }

function TryRemove ($Path)
  {
    "Verifying path: $Path"
    $PathIsValid = Test-Path $Path
    If ($PathIsValid)
    {
      "Given path is not empty"
      remove-item $Path -Force -Recurse
      "Deleted $Path"
    }
    PrintEmptyLine
  }

function CleanupReporter ($Path)
  {
    "Performing Reporter Cleanup"
    PrintLine
    PrintEmptyLine
    TryRemove -Path "$($Path)/roll"
    TryRemove -Path "$($Path)/mocha-koan-reporter*.tgz"
    PrintLine
  }

function CleanupTestHarness ($Path)
  {
    "Performing Test Environment Cleanup"
    PrintLine
    PrintEmptyLine
    TryRemove -Path "$($Path)/node_modules/mocha-koan-reporter"
    PrintLine
  }

function BuildReporter ($Path)
  {
    "Building Reporter"
    PrintLine
    RunPSProcess -Command 'npm install' -Path $Path
    RunPSProcess -Command 'npm run roll' -Path $Path
    RunPSProcess -Command 'npm run build' -Path $Path
    RunPSProcess -Command 'npm pack' -Path $Path
    PrintEmptyLine
    PrintLine
  }

function BuildTestHarness ($Path)
  {
    "Building Test Environment"
    PrintLine
    PrintEmptyLine
    RunPSProcess -Command 'npm install' -Path $Path
    PrintEmptyLine
    PrintLine
  }

function RunTests ($Path)
  {
    "Running Tests"
    PrintLine
    RunPSProcess -Command 'npm run test:pass' -Path $Path
    RunPSProcess -Command 'npm run test:fail' -Path $Path
    PrintEmptyLine
    PrintLine
  }

function RunDebug ($Path)
  {
    "Running Node Debugger"
    PrintLine
    RunPSProcess -Command 'npm run debug' -Path $Path
    PrintEmptyLine
    PrintLine
  }

function SetReporterVersion ($Path, $Version)
  {
    "Changing Reporter Version"
    PrintLine
    RunPSProcess -Command "npm version $($Version)" -Path $Path
    PrintEmptyLine
    PrintLine
  }

function SetTestHarnessReporterVersion ($Path, $Version)
  {
    "Changing Test Environment Reporter Version"
    PrintLine
    RunPSProcess -Command "npm install ../reporter/mocha-koan-reporter-$($Version).tgz" -Path $Path
    PrintEmptyLine
    PrintLine
  }
