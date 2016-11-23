param (
  [switch]$debug = $false
  [string]$version = ""
)

$SourcePath = './reporter'
$TestPath = './reporter-test'

import-module ./scripts/tasks.psm1

PrintLine

if (-Not ([string]::IsNullOrEmpty($version))) {
  SetReporterVersion -Path $SourcePath -Version $version
  SetTestHarnessReporterVersion -Path $TestPath -Version $version
}
else {
  CleanupReporter -Path $SourcePath
  CleanupTestHarness -Path $TestPath
  BuildReporter -Path $SourcePath
  BuildTestHarness -Path $TestPath

  if ($debug) {
    RunDebug -Path $TestPath
  }
  else {
    RunTests -Path $TestPath
  }
}
