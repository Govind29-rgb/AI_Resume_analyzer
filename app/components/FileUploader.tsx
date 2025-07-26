import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const FileUploader = () => {
  const [file, setFile] = useState<any>()

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          <div className="space-y-4 cursor-pointer">
            <div className="mx-auto w-16 h-16 flex items-center justify-center">
              <img src="/icons/info.svg" alt="upload" className="size-20" />
            </div>
            {file ? (
              <div>
                <p className="text-lg text-gray-600 font-medium">
                  {file.name}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg text-gray-500">
                  <span className="font-semibold text-gray-700">
                    Click to Upload
                  </span> or drag and drop
                </p>
                <p className="text-lg text-gray-500">
                  PDF (max 20 MB)
                </p>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  )
}

export default FileUploader;
