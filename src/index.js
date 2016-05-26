import Plugin from 'stc-plugin';
import ts from 'typescript';

/**
 * TypeScript transpile
 */
export default class TypeScriptPlugin extends Plugin {
  /**
   * run
   */
  async run(){
    let content = await this.getContent('utf8');
    let diagnostics = [];
    let output = ts.transpileModule(content, {
      compilerOptions: {
        module: this.options.module || ts.ModuleKind.CommonJS,
        target: this.options.target || ts.ScriptTarget.ES5,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        allowSyntheticDefaultImports: true,
        sourceMap: this.options.sourceMap
      },
      fileName: this.file.path,
      reportDiagnostics: !!diagnostics
    });
    ts.addRange(diagnostics, output.diagnostics);

    //has error
    if(diagnostics.length){
      let firstDiagnostics = diagnostics[0];
      let {line, character} = firstDiagnostics.file.getLineAndCharacterOfPosition(firstDiagnostics.start);
      let message = ts.flattenDiagnosticMessageText(firstDiagnostics.messageText, '\n');
      throw new Error(`${message} on Line ${line + 1}, Character ${character}, File \`${this.file.path}\``);
    }
    return {content: output.outputText};
  }
  /**
   * update
   */
  update(ret){
    this.setContent(ret.content);
    //change file extname
    this.file.extname = this.options.ext || '.js';
  }
  
  /**
   * use cluster
   */
  static cluster(){
    return true;
  }
}