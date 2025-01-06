class ConfiguracaoUsuario:
    def __init__(self, tema="padrão", notificacoes=True, idioma="pt-BR"):
        self.tema = tema
        self.notificacoes = notificacoes
        self.idioma = idioma

    def __str__(self):
        return {
            "tema": self.tema,
            "notificacoes": self.notificacoes,
            "idioma": self.idioma,
        }
