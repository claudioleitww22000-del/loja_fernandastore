# 🌤️ Weather Dashboard

Um **Dashboard de Clima Moderno e Completo** que fetches dados em tempo real da API pública OpenWeatherMap!

## ✨ Características

### 🌍 Funcionalidades Principais
- ✅ Busca de clima por cidade
- ✅ Autocompletar cidades
- ✅ Localização em tempo real (GPS)
- ✅ Previsão de 5 dias
- ✅ Previsão por hora (24h)
- ✅ Detalhes climáticos avançados
- ✅ Conversão entre °C e °F
- ✅ Cidades favoritas
- ✅ Mapa interativo
- ✅ Design responsivo

### 📊 Dados Exibidos
- 🌡️ Temperatura atual
- 💨 Velocidade do vento
- 💧 Umidade
- 👁️ Visibilidade
- 📊 Pressão atmosférica
- 🤔 Sensação térmica
- ☀️ Índice UV
- 🎯 Descrição do clima

### 🎨 Design
- Interface moderna com gradientes
- Animações suaves
- Responsivo (mobile, tablet, desktop)
- Modo claro
- Ícones dinâmicos

## 🚀 Como Usar

### 1. Obter API Key

1. Acesse: https://openweathermap.org/api
2. Crie uma conta gratuita
3. Copie sua **API Key**
4. Cole no arquivo `weather-script.js`:

```javascript
const API_KEY = 'SUA_CHAVE_AQUI';
```

### 2. Abrir o Dashboard

- Abra `weather-dashboard.html` no navegador
- Ou use um servidor local

### 3. Usar as Funcionalidades

#### Buscar Cidade
- Digite o nome da cidade
- Clique no botão de busca ou pressione Enter
- Selecione de uma sugestão

#### Usar GPS
- Clique no botão de localização
- Autorize o acesso à sua localização

#### Adicionar Favoritos
- Clique em uma cidade para carregar
- Será adicionada automaticamente aos favoritos
- Máximo de 5 favoritos

#### Converter Temperatura
- Clique em "°C / °F" no footer
- A temperatura muda entre Celsius e Fahrenheit

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos (Flexbox, Grid, Gradientes)
- **JavaScript Vanilla** - Funcionalidades
- **OpenWeatherMap API** - Dados climáticos
- **Geolocation API** - Localização do usuário
- **LocalStorage** - Cidades favoritas
- **Font Awesome** - Ícones
- **OpenStreetMap** - Mapas

## 📁 Estrutura

```
weather-dashboard/
├── weather-dashboard.html    # HTML principal
├── weather-style.css         # Estilos CSS
├── weather-script.js         # JavaScript
└── README.md                 # Este arquivo
```

## 🌐 API Endpoints Utilizados

### Current Weather
```
GET /weather?lat={lat}&lon={lon}&units={units}&appid={API_KEY}
```

### Forecast (5 Days)
```
GET /forecast?lat={lat}&lon={lon}&units={units}&appid={API_KEY}
```

### Geocoding
```
GET /geo/1.0/direct?q={city}&appid={API_KEY}
```

### UV Index
```
GET /uvi?lat={lat}&lon={lon}&appid={API_KEY}
```

## 📱 Responsividade

- 📱 Mobile (320px+) - Layout colapsado
- 📱 Tablet (768px+) - Layout adaptado
- 💻 Desktop (1024px+) - Layout completo

## 🎯 Próximas Melhorias

- [ ] Gráficos de temperatura
- [ ] Alertas climáticos
- [ ] Modo escuro
- [ ] Previsão de chuva por hora
- [ ] Histórico de buscas
- [ ] Compartilhar clima
- [ ] Notificações push

## 📝 Notas Importantes

- A API gratuita tem limite de 1000 requisições/dia
- Primeira carga tenta usar GPS do navegador
- Favoritos são salvos localmente (localStorage)
- Sem backend necessário

## 🔗 Links Úteis

- [OpenWeatherMap API](https://openweathermap.org/api)
- [Documentação](https://openweathermap.org/api/one-call-3)
- [Códigos de Ícones](https://openweathermap.org/weather-conditions)

## 📞 Suporte

Para dúvidas ou bugs, abra uma issue no repositório!

---

**Desenvolvido com ❤️**

⭐ Se gostou, deixe uma star!
