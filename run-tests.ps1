$SourcePath = './reporter'
$TestPath = './reporter-test'
$PrintLine = '=============================='
$PrintEmptyLine = ''

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
    $PrintEmptyLine
  }

function Cleanup
  {
    "Performing cleanup"
    $PrintLine
    $PrintEmptyLine
    TryRemove -Path ./reporter/lib
    TryRemove -Path ./reporter/mocha-koan-reporter*.tgz
    TryRemove -Path ./reporter-test/node_modules/mocha-koan-reporter
    $PrintLine
  }

function BuildReporter
  {
    "Building reporter"
    $PrintLine
    RunPSProcess -Command 'npm run build' -Path $SourcePath
    RunPSProcess -Command 'npm pack' -Path $SourcePath
    $PrintEmptyLine
    $PrintLine
  }

function BuildTest
  {
    "Building test environment"
    $PrintLine
    $PrintEmptyLine
    RunPSProcess -Command 'npm install' -Path $TestPath
    $PrintEmptyLine
    $PrintLine
  }

function RunTest
  {
    "Running test"
    $PrintLine
    RunPSProcess -Command 'npm run test:pass' -Path $TestPath
    RunPSProcess -Command 'npm run test:fail' -Path $TestPath
    $PrintEmptyLine
    $PrintLine
  }

$PrintLine
Cleanup
BuildReporter
BuildTest
RunTest
