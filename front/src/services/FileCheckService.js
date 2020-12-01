
class FileCheckService {

  checkDocsType = (doc, allowedDocsExtensions = ['doc', 'docx', 'xls', 'xlsx', 'pdf']) => {
      let arraydocNameWithExtensionType = doc.name.split(".");
      const docExtensionType = arraydocNameWithExtensionType.pop();
      return allowedDocsExtensions.includes(docExtensionType);
    }

    moreThen32MB = (docs) => {
      const sumOfFilesWeight =  docs
          .map(item => item.size)
          .reduce((prev, curr) => prev + curr, 0);

        if (sumOfFilesWeight > 33554432 ) {
          return true;
        } else {
          return false;
        }
      }
}

export default FileCheckService;
