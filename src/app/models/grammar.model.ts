/** Classe referente a cada regra dentro de uma gramática regular */
export class GrammarRule {
  /** Lado esquerdo da regra (símbolo não terminal) */
  left: string;
  /** Lado direito da regra (lista de símbolos terminais e não terminais) */
  right: string[] = [];

  /**
    Seta o valor do lado esquerdo da regra de gramática, validando a entrada
    @param {string} content Conteúdo a ser adicionado.
  **/
  setLeft(content: string) {
    if (content.length > 1 || content.toLowerCase() == content || content == 'ε')
      throw Error("Formato de caractere não terminal é letra maiúscula [A-Z]!");

    this.left = content;
  }

  /**
    Adiciona um valor do lado direito da regra de gramática.
    @param {string} content conteúdo a ser adicionado.
   **/
  addRight(content: string) {
    this.right.push(content);
  }

  /**
    Remove um valor do lado direito da regra através de seu índice
    @param {Int} index índice do item a ser removido
    @return {string} o item removido.
   **/
  remove(index: number): string {
    if (index < 0 || index >= this.right.length)
      throw Error("Índice fora da range de right.");

    return this.right.splice(index, 1)[0];
  }
}

/** Classe referente a uma gramática regular */
export class Grammar {
  /** Nome da gramática para referência do usuário */
  title: string;
  /** Lista de regras que compõem a gramática */
  rules: GrammarRule[] = [];
  /** Símbolo inicial da gramática */
  initial: string;
  /** Data da última modificação da gramática */
  modified: Date = new Date();
  definition: string = '';

  constructor(title: string, initial: string) {
    this.title = title;
    this.initial = initial || 'S';
  }

  generateDefinition() {
    /** G = ({S, A}, {a, b}, P, S) */
    let terminals = [];
    let nonTerminals = [];
    for (let rule of this.rules) {
      if (nonTerminals.indexOf(rule.left) == -1) nonTerminals.push(rule.left);
      for (let part of rule.right) {
        for (let symbol of part.split("")) {
          if (symbol.toLowerCase() != symbol) continue;
          if (terminals.indexOf(symbol) == -1) terminals.push(symbol);
        }
      }
    }
    this.definition = `G = ({${nonTerminals.join(", ")}}, {${terminals.join(", ")}}, P, ${this.initial})`;
    console.log(this.definition);
  }

  /**
    Remove uma regra com base em seu índice
    @param {Int} index índice do item a ser removido
    @return {GrammarRule} o item removido.
   **/
  remove(index: number): GrammarRule {
    if (index < 0 || index >= this.rules.length)
      throw Error("Índice fora da range de rules.");

    let removed = this.rules.splice(index, 1)[0];

    this.generateDefinition();

    return removed
  }
}