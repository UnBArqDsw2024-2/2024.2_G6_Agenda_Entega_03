class Command:
    def execute(self):
        pass

    def undo(self):
        pass

class PersonalizarConfiguracoesCommand(Command):
    def __init__(self, configuracao, tema, notificacoes, idioma):
        self.configuracao = configuracao
        self.tema = tema
        self.notificacoes = notificacoes
        self.idioma = idioma

        # Para undo
        self.prev_tema = None
        self.prev_notificacoes = None
        self.prev_idioma = None

    def execute(self):
        self.prev_tema = self.configuracao.tema
        self.prev_notificacoes = self.configuracao.notificacoes
        self.prev_idioma = self.configuracao.idioma

        self.configuracao.tema = self.tema
        self.configuracao.notificacoes = self.notificacoes
        self.configuracao.idioma = self.idioma

    def undo(self):
        self.configuracao.tema = self.prev_tema
        self.configuracao.notificacoes = self.prev_notificacoes
        self.configuracao.idioma = self.prev_idioma
