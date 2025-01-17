# Factory Method

## Introdução
O Factory Method é um padrão de design criacional que define uma interface para a criação de objetos, delegando às subclasses a responsabilidade de determinar quais tipos específicos de objetos devem ser instanciados. Esse padrão é particularmente valioso em cenários onde é necessário desacoplar o código cliente das classes concretas, promovendo maior flexibilidade, reutilização e escalabilidade no sistema.

## Elementos principais do Factory Method

- **Product (Produto)**: Define a interface ou classe base para os objetos que serão criados pelo Factory Method.
- **ConcreteProduct (Produto Concreto)**: Implementa a interface do produto, sendo a classe real que será instanciada.
- **Creator (Criador)**: Declara o método de fábrica, que retorna objetos do tipo **Product**. Pode incluir uma implementação padrão do método.
- **ConcreteCreator (Criador Concreto)**: Substitui ou implementa o método de fábrica para criar instâncias específicas de **ConcreteProduct**. 

## Vantagens e Justificativas para o Uso do Factory Method: 

O padrão **Factory Method** é altamente benéfico para projetos que exigem flexibilidade e modularidade. Ele centraliza a lógica de criação em métodos especializados, o que simplifica a manutenção e melhora o desempenho em sistemas grandes. As principais vantagens incluem:  

1. **Desacoplamento de Implementações Concretas**  
   O cliente não precisa conhecer ou depender diretamente das classes concretas, interagindo apenas com as interfaces abstratas.  

2. **Extensibilidade Simplificada**  
   Novos produtos podem ser adicionados ao sistema facilmente, sem modificar o código existente, apenas criando novas subclasses de **Product** e **Creator**.  

3. **Controle Centralizado de Instanciação**  
   A lógica de criação de objetos é encapsulada no método de fábrica, garantindo consistência e centralização.  

4. **Redução de Duplicação de Código**  
   Reutiliza a lógica de criação em diferentes partes do sistema, reduzindo a redundância.  

## Metodologia

### Contexto do Sistema de Agenda
No sistema de agenda, o padrão Factory Method foi aplicado para lidar com a necessidade de criar diferentes tipos de eventos, como reuniões, consultas, lembretes, e outros. Cada um desses tipos de eventos pode ter atributos e comportamentos específicos. O Factory Method ajuda a organizar e centralizar a criação desses objetos, permitindo que o sistema seja facilmente estendido com novas categorias de eventos no futuro.

### Motivação da Escolha
O Factory Method foi escolhido em vez de outras abordagens, como criar objetos diretamente ou usar uma única classe para todos os tipos de eventos, devido ao desacoplamento e flexibilidade que ele oferece. Criar objetos diretamente tornaria o código dependente das classes concretas, dificultando a manutenção e extensão do sistema. Usar uma única classe para todos os tipos de eventos levaria a uma classe complexa e difícil de manter. O Factory Method permite que cada categoria de evento tenha sua própria classe e sua própria lógica de criação, facilitando a manutenção, evolução e testes do sistema.

### Rastreabilidade
A classe `GerenciadorEventos` é o ponto central do padrão Factory Method em nosso sistema de agenda. É nessa classe que os factories e os eventos são criados e orquestrados. As funções `criar_classe_evento` e `criar_classe_factory` são utilizadas para gerar dinamicamente as classes concretas de eventos e factories, respectivamente. Isso permite que o sistema crie novos tipos de eventos sem modificar o código principal. Essa abordagem reduz a duplicação de código, melhora a organização, e facilita a extensibilidade do sistema, adicionando novas categorias de eventos e seus factories com facilidade, já que a lógica de criação é abstraída.

## Modelagem

<body>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" contentStyleType="text/css" data-diagram-type="CLASS" height="251.0417px" preserveAspectRatio="none" style="width:1325px;height:251px;background:#FFFFFF;" version="1.1" viewBox="0 0 1325 251" width="1325px" zoomAndPan="magnify"><defs/><g><!--class EventoFactory--><g id="elem_EventoFactory"><rect codeLine="14" fill="#ADD8E6" height="37.793" id="EventoFactory" rx="1.3021" ry="1.3021" style="stroke:#0000FF;stroke-width:0.2604;" width="404.6783" x="460.4167" y="123.5365"/><ellipse cx="634.215" cy="134.0223" fill="#B4A7E5" rx="5.7292" ry="5.7292" style="stroke:#181818;stroke-width:0.5208;"/><path d="M632.091,131.8169 L632.091,130.6938 L635.9403,130.6938 L635.9403,131.8169 L634.6545,131.8169 L634.6545,136.0243 L635.9403,136.0243 L635.9403,137.1473 L632.091,137.1473 L632.091,136.0243 L633.3768,136.0243 L633.3768,131.8169 L632.091,131.8169 Z " fill="#000000"/><text fill="#000000" font-family="sans-serif" font-size="6.25" font-style="italic" lengthAdjust="spacing" textLength="35.5225" x="653.4582" y="131.942">«interface»</text><text fill="#000000" font-family="sans-serif" font-size="7.2917" font-style="italic" lengthAdjust="spacing" textLength="52.6545" x="644.8921" y="140.1843">EventoFactory</text><line style="stroke:#0000FF;stroke-width:0.2604;" x1="460.9375" x2="864.5742" y1="144.5081" y2="144.5081"/><line style="stroke:#0000FF;stroke-width:0.2604;" x1="460.9375" x2="864.5742" y1="148.6748" y2="148.6748"/><ellipse cx="466.1458" cy="155.7834" fill="#84BE84" rx="1.5625" ry="1.5625" style="stroke:#038048;stroke-width:0.5208;"/><text fill="#000000" font-family="sans-serif" font-size="7.2917" font-style="italic" lengthAdjust="spacing" textLength="391.1367" x="470.8333" y="157.5264">criar_evento(titulo: str, data: str, local: Optional[str], descricao: Optional[str], lembrete: bool) : EventoBase</text></g><!--class ReuniaoFactory--><g id="elem_ReuniaoFactory"><rect codeLine="19" fill="#F1F1F1" height="33.488" id="ReuniaoFactory" rx="1.3021" ry="1.3021" style="stroke:#181818;stroke-width:0.2604;" width="404.6783" x="3.6458" y="213.9323"/><ellipse cx="175.2439" cy="222.2656" fill="#ADD1B2" rx="5.7292" ry="5.7292" style="stroke:#181818;stroke-width:0.5208;"/><path d="M176.7901,225.2035 Q176.489,225.3581 176.1553,225.4313 Q175.8217,225.5127 175.4555,225.5127 Q174.1534,225.5127 173.4617,224.6582 Q172.7781,223.7956 172.7781,222.168 Q172.7781,220.5404 173.4617,219.6777 Q174.1534,218.8151 175.4555,218.8151 Q175.8217,218.8151 176.1553,218.8965 Q176.4971,218.9779 176.7901,219.1325 L176.7901,220.5485 Q176.4646,220.2474 176.1553,220.109 Q175.8461,219.9626 175.5206,219.9626 Q174.8207,219.9626 174.4626,220.5241 Q174.1046,221.0775 174.1046,222.168 Q174.1046,223.2585 174.4626,223.82 Q174.8207,224.3734 175.5206,224.3734 Q175.8461,224.3734 176.1553,224.235 Q176.4646,224.0885 176.7901,223.7874 L176.7901,225.2035 Z " fill="#000000"/><text fill="#000000" font-family="sans-serif" font-size="7.2917" lengthAdjust="spacing" textLength="57.0552" x="185.921" y="224.7899">ReuniaoFactory</text><line style="stroke:#181818;stroke-width:0.2604;" x1="4.1667" x2="407.8033" y1="230.599" y2="230.599"/><line style="stroke:#181818;stroke-width:0.2604;" x1="4.1667" x2="407.8033" y1="234.7656" y2="234.7656"/><ellipse cx="9.375" cy="241.8742" fill="#84BE84" rx="1.5625" ry="1.5625" style="stroke:#038048;stroke-width:0.5208;"/><text fill="#000000" font-family="sans-serif" font-size="7.2917" lengthAdjust="spacing" textLength="391.1367" x="14.0625" y="243.6172">criar_evento(titulo: str, data: str, local: Optional[str], descricao: Optional[str], lembrete: bool) : EventoBase</text></g><!--class ConsultaFactory--><g id="elem_ConsultaFactory"><rect codeLine="22" fill="#F1F1F1" height="33.488" id="ConsultaFactory" rx="1.3021" ry="1.3021" style="stroke:#181818;stroke-width:0.2604;" width="404.6783" x="460.4167" y="213.9323"/><ellipse cx="630.9163" cy="222.2656" fill="#ADD1B2" rx="5.7292" ry="5.7292" style="stroke:#181818;stroke-width:0.5208;"/><path d="M632.4626,225.2035 Q632.1615,225.3581 631.8278,225.4313 Q631.4941,225.5127 631.1279,225.5127 Q629.8258,225.5127 629.1341,224.6582 Q628.4505,223.7956 628.4505,222.168 Q628.4505,220.5404 629.1341,219.6777 Q629.8258,218.8151 631.1279,218.8151 Q631.4941,218.8151 631.8278,218.8965 Q632.1696,218.9779 632.4626,219.1325 L632.4626,220.5485 Q632.137,220.2474 631.8278,220.109 Q631.5186,219.9626 631.193,219.9626 Q630.4932,219.9626 630.1351,220.5241 Q629.777,221.0775 629.777,222.168 Q629.777,223.2585 630.1351,223.82 Q630.4932,224.3734 631.193,224.3734 Q631.5186,224.3734 631.8278,224.235 Q632.137,224.0885 632.4626,223.7874 L632.4626,225.2035 Z " fill="#000000"/><text fill="#000000" font-family="sans-serif" font-size="7.2917" lengthAdjust="spacing" textLength="59.2519" x="641.5934" y="224.7899">ConsultaFactory</text><line style="stroke:#181818;stroke-width:0.2604;" x1="460.9375" x2="864.5742" y1="230.599" y2="230.599"/><line style="stroke:#181818;stroke-width:0.2604;" x1="460.9375" x2="864.5742" y1="234.7656" y2="234.7656"/><ellipse cx="466.1458" cy="241.8742" fill="#84BE84" rx="1.5625" ry="1.5625" style="stroke:#038048;stroke-width:0.5208;"/><text fill="#000000" font-family="sans-serif" font-size="7.2917" lengthAdjust="spacing" textLength="391.1367" x="470.8333" y="243.6172">criar_evento(titulo: str, data: str, local: Optional[str], descricao: Optional[str], lembrete: bool) : EventoBase</text></g><!--class LembreteFactory--><g id="elem_LembreteFactory"><rect codeLine="25" fill="#F1F1F1" height="33.488" id="LembreteFactory" rx="1.3021" ry="1.3021" style="stroke:#181818;stroke-width:0.2604;" width="404.6783" x="917.1875" y="213.9323"/><ellipse cx="1086.1064" cy="222.2656" fill="#ADD1B2" rx="5.7292" ry="5.7292" style="stroke:#181818;stroke-width:0.5208;"/><path d="M1087.6526,225.2035 Q1087.3515,225.3581 1087.0178,225.4313 Q1086.6842,225.5127 1086.318,225.5127 Q1085.0159,225.5127 1084.3241,224.6582 Q1083.6405,223.7956 1083.6405,222.168 Q1083.6405,220.5404 1084.3241,219.6777 Q1085.0159,218.8151 1086.318,218.8151 Q1086.6842,218.8151 1087.0178,218.8965 Q1087.3596,218.9779 1087.6526,219.1325 L1087.6526,220.5485 Q1087.3271,220.2474 1087.0178,220.109 Q1086.7086,219.9626 1086.3831,219.9626 Q1085.6832,219.9626 1085.3251,220.5241 Q1084.967,221.0775 1084.967,222.168 Q1084.967,223.2585 1085.3251,223.82 Q1085.6832,224.3734 1086.3831,224.3734 Q1086.7086,224.3734 1087.0178,224.235 Q1087.3271,224.0885 1087.6526,223.7874 L1087.6526,225.2035 Z " fill="#000000"/><text fill="#000000" font-family="sans-serif" font-size="7.2917" lengthAdjust="spacing" textLength="62.4135" x="1096.7834" y="224.7899">LembreteFactory</text><line style="stroke:#181818;stroke-width:0.2604;" x1="917.7083" x2="1321.345" y1="230.599" y2="230.599"/><line style="stroke:#181818;stroke-width:0.2604;" x1="917.7083" x2="1321.345" y1="234.7656" y2="234.7656"/><ellipse cx="922.9167" cy="241.8742" fill="#84BE84" rx="1.5625" ry="1.5625" style="stroke:#038048;stroke-width:0.5208;"/><text fill="#000000" font-family="sans-serif" font-size="7.2917" lengthAdjust="spacing" textLength="391.1367" x="927.6042" y="243.6172">criar_evento(titulo: str, data: str, local: Optional[str], descricao: Optional[str], lembrete: bool) : EventoBase</text></g><!--class GerenciadorEventos--><g id="elem_GerenciadorEventos"><rect codeLine="30" fill="#F1F1F1" height="58.9518" id="GerenciadorEventos" rx="1.3021" ry="1.3021" style="stroke:#181818;stroke-width:0.2604;" width="200.2625" x="562.625" y="3.6458"/><ellipse cx="623.5521" cy="11.9792" fill="#ADD1B2" rx="5.7292" ry="5.7292" style="stroke:#181818;stroke-width:0.5208;"/><path d="M625.0983,14.917 Q624.7972,15.0716 624.4635,15.1449 Q624.1299,15.2262 623.7637,15.2262 Q622.4616,15.2262 621.7698,14.3717 Q621.0863,13.5091 621.0863,11.8815 Q621.0863,10.2539 621.7698,9.3913 Q622.4616,8.5286 623.7637,8.5286 Q624.1299,8.5286 624.4635,8.61 Q624.8053,8.6914 625.0983,8.846 L625.0983,10.262 Q624.7728,9.9609 624.4635,9.8226 Q624.1543,9.6761 623.8288,9.6761 Q623.1289,9.6761 622.7708,10.2376 Q622.4128,10.791 622.4128,11.8815 Q622.4128,12.972 622.7708,13.5335 Q623.1289,14.0869 623.8288,14.0869 Q624.1543,14.0869 624.4635,13.9486 Q624.7728,13.8021 625.0983,13.501 L625.0983,14.917 Z " fill="#000000"/><text fill="#000000" font-family="sans-serif" font-size="7.2917" lengthAdjust="spacing" textLength="73.9812" x="634.2292" y="14.5035">GerenciadorEventos</text><line style="stroke:#181818;stroke-width:0.2604;" x1="563.1458" x2="762.3666" y1="20.3125" y2="20.3125"/><rect fill="none" height="3.125" style="stroke:#C82930;stroke-width:0.5208;" width="3.125" x="566.7917" y="25.8586"/><text fill="#000000" font-family="sans-serif" font-size="7.2917" lengthAdjust="spacing" textLength="91.9754" x="573.0417" y="29.1641">categorias: Dict[str, Dict]</text><line style="stroke:#181818;stroke-width:0.2604;" x1="563.1458" x2="762.3666" y1="32.9671" y2="32.9671"/><ellipse cx="568.3542" cy="40.0757" fill="#84BE84" rx="1.5625" ry="1.5625" style="stroke:#038048;stroke-width:0.5208;"/><text fill="#000000" font-family="sans-serif" font-size="7.2917" lengthAdjust="spacing" textLength="186.7208" x="573.0417" y="41.8187">registrar_categoria(nome: str, prioridade: str): void</text><ellipse cx="568.3542" cy="48.5636" fill="#84BE84" rx="1.5625" ry="1.5625" style="stroke:#038048;stroke-width:0.5208;"/><text fill="#000000" font-family="sans-serif" font-size="7.2917" lengthAdjust="spacing" textLength="129.8935" x="573.0417" y="50.3067">remover_categoria(nome: str): void</text><ellipse cx="568.3542" cy="57.0516" fill="#84BE84" rx="1.5625" ry="1.5625" style="stroke:#038048;stroke-width:0.5208;"/><text fill="#000000" font-family="sans-serif" font-size="7.2917" lengthAdjust="spacing" textLength="153.2496" x="573.0417" y="58.7947">get_factory(categoria: str): EventoFactory</text></g><!--reverse link EventoFactory to ReuniaoFactory--><g id="link_EventoFactory_ReuniaoFactory"><path d="M555.9788,163.3412 C474.9423,178.8099 369.9635,198.8542 292.2344,213.6927 " fill="none" id="EventoFactory-backto-ReuniaoFactory" style="stroke:#181818;stroke-width:0.5208;stroke-dasharray:7.0,7.0;"/><polygon fill="none" points="565.1875,161.5833,555.3928,160.2716,556.5647,166.4107,565.1875,161.5833" style="stroke:#181818;stroke-width:0.5208;"/></g><!--reverse link EventoFactory to ConsultaFactory--><g id="link_EventoFactory_ConsultaFactory"><path d="M662.7552,170.8229 C662.7552,186.3229 662.7552,198.8646 662.7552,213.75 " fill="none" id="EventoFactory-backto-ConsultaFactory" style="stroke:#181818;stroke-width:0.5208;stroke-dasharray:7.0,7.0;"/><polygon fill="none" points="662.7552,161.4479,659.6302,170.8229,665.8802,170.8229,662.7552,161.4479" style="stroke:#181818;stroke-width:0.5208;"/></g><!--reverse link EventoFactory to LembreteFactory--><g id="link_EventoFactory_LembreteFactory"><path d="M769.5316,163.3412 C850.5681,178.8099 955.5469,198.8542 1033.276,213.6927 " fill="none" id="EventoFactory-backto-LembreteFactory" style="stroke:#181818;stroke-width:0.5208;stroke-dasharray:7.0,7.0;"/><polygon fill="none" points="760.3229,161.5833,768.9457,166.4107,770.1176,160.2716,760.3229,161.5833" style="stroke:#181818;stroke-width:0.5208;"/></g><!--reverse link GerenciadorEventos to EventoFactory--><g id="link_GerenciadorEventos_EventoFactory"><path codeLine="38" d="M662.7552,69.0521 C662.7552,88.3385 662.7552,106.8021 662.7552,123.4323 " fill="none" id="GerenciadorEventos-backto-EventoFactory" style="stroke:#181818;stroke-width:0.5208;"/><polygon fill="#181818" points="662.7552,62.8021,660.6719,65.9271,662.7552,69.0521,664.8385,65.9271,662.7552,62.8021" style="stroke:#181818;stroke-width:0.5208;"/><text fill="#000000" font-family="sans-serif" font-size="6.7708" lengthAdjust="spacing" textLength="18.2693" x="663.276" y="95.4463">has a</text></g><!--SRC=[pLJ1Rjim3BtxAuXUccuBq1rsCOeUacx5W083TYsAW94OHuWi6fGSe2ZwDJliG_fZeoFRSveUTjhcaq0-akyzKJw76zguu89be9YSvmWD2e8BYMI3XY8G68ynwWdNCGacZ4NSkT3Xwfo3fmBqMw3PLS9ji4lsB5TNOvVhQxXprJOjV4iPoc99te3zHhnkbgURDFIw5NmyxJL17G3FnJaiEMnSrGg-_7pvmLaWjZM5X08C2MiCMpL0BMWKWrs69nfju-3JvIGGs5Aa1ZvUJgE2OJT4TUhNGHMekKjnQ5cAKIfytdTJlYXLbaSuCY6x-TveZQpeW9ibbrhF9QYw3s3r4lgZPuE-X6zDSXpGtslmGG4KjTeWdsGyrMkXH2MicVq5b3sH1KQ2fy6zP_MjCww_U4k3WCvBe_LSv8l_JcrmECfmTQC3j5yyrjSf-ljwL4HcgQHZwnF-2Sr_IlIk1_t7HCUrW5iI2YQlXHqMElPA9ia-qN6U6qnKiTAE9Tmua-uF5BlJGvOaLBbk1sKrGcU1Q-h5DE8qPD7cm4K9UtPsAArvJsyM7k4gIgjDzd4sOWVOaSsTtE9K2RoRpr-ztnBEjgX_oBDV]--></g></svg>
</body>

## Código

```python
from abc import ABC, abstractmethod
from datetime import datetime
from typing import Optional, Dict
import json
from flask import Flask, request, jsonify
from flask_cors import CORS


# ===================== Concrete Creator & Client =====================
class GerenciadorEventos:
    """
    Gerencia as categorias de eventos e as factories.
    """
    def __init__(self):
        """
        Inicializa o gerenciador de eventos.
        """
        self.categorias: Dict[str, Dict] = {}  # nome -> {prioridade, factory}
        self.carregar_configuracoes()

    def carregar_configuracoes(self):
        """
        Carrega as configurações das categorias de eventos a partir de um arquivo JSON.
        """
        try:
            with open('configuracoes.json', 'r') as f:
                dados = json.load(f)
                for categoria in dados.get('categorias', []):
                    self.registrar_categoria(
                        categoria['nome'],
                        categoria['prioridade']
                    )
        except FileNotFoundError:
            # Cria categoria padrão se arquivo não existir
            self.registrar_categoria("Geral", "Média")

    def salvar_configuracoes(self):
        """
        Salva as configurações das categorias de eventos em um arquivo JSON.
        """
        dados = {
            'categorias': [
                {
                    'nome': nome,
                    'prioridade': info['prioridade']
                }
                for nome, info in self.categorias.items()
            ]
        }
        with open('configuracoes.json', 'w') as f:
            json.dump(dados, f)

    def registrar_categoria(self, nome: str, prioridade: str) -> None:
        """
        Registra uma nova categoria de evento e sua factory.
        """
        nome_normalizado = nome.title().replace(" ", "")

        # Cria classe de evento para a categoria
        classe_evento = criar_classe_evento(nome_normalizado, prioridade)

        # Cria factory para a categoria
        classe_factory = criar_classe_factory(nome_normalizado, classe_evento)

        # Instancia e registra a factory
        self.categorias[nome.lower()] = {
            'prioridade': prioridade,
            'factory': classe_factory()
        }
        
        self.salvar_configuracoes()

    def remover_categoria(self, nome: str) -> None:
        """
        Remove uma categoria de evento.
        """
        if nome.lower() in self.categorias:
            del self.categorias[nome.lower()]
            self.salvar_configuracoes()

    def get_factory(self, categoria: str) -> EventoFactory:
        """
        Retorna a factory para uma categoria específica.
        """
        info = self.categorias.get(categoria.lower())
        if not info:
            raise ValueError(f"Categoria não encontrada: {categoria}")
        return info['factory']

# ===================== Flask Application =====================
app = Flask(__name__)
CORS(app)

gerenciador = GerenciadorEventos()

@app.route("/api/eventos", methods=["POST"])
def criar_evento():
    """
    Cria um novo evento.
    """
    dados = request.json
    try:
        categoria = dados["categoria"]
        factory = gerenciador.get_factory(categoria)

        evento = factory.criar_evento(
            titulo=dados["titulo"],
            data=dados["data"],
            local=dados.get("local"),
            descricao=dados.get("descricao"),
            lembrete=dados.get("lembrete", False)
        )

        return jsonify(evento.to_dict()), 201

    except (KeyError, ValueError) as e:
        return jsonify({"erro": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
```

## Referências
> Gamma, E., et al. Design Patterns: Elements of Reusable Object-Oriented Software. Addison-Wesley, 1994.
>
> 

## Histórico de Versões

| Versão | Data | Descrição | Autor | Revisor |
| :----: | ---- | --------- | ----- | ------- |
| `1.0`  |04/01/2025| Estrutura do artefato | [Julia Vitória](https://github.com/Juhvitoria4) | |
| `1.1`  |05/01/2025| Modelagem | [Gabriel Moura](https://github.com/thegm445) | |
| `1.2`  |05/01/2025| Código | [Gabriel Moura](https://github.com/thegm445) | |


