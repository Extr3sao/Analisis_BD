$files = Get-ChildItem tests -File -Filter 'test_*.py' | Sort-Object Name
foreach ($file in $files) {
  Write-Output "=== $($file.Name) ==="
  $job = Start-Job -ScriptBlock {
    param($root, $path)
    Set-Location $root
    & .\.venv\Scripts\python.exe -m pytest $path -q
  } -ArgumentList (Get-Location).Path, $file.FullName

  if (Wait-Job $job -Timeout 25) {
    Receive-Job $job
  } else {
    Write-Output "TIMEOUT $($file.Name)"
    Stop-Job $job | Out-Null
  }

  Remove-Job $job -Force
}
