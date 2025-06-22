---
layout: "base.njk"
title: "비즈니스적 관점에서 보는 MCP Server"
date: 2025-06-21
wip: true
---

Anthropic에서 개발한 MCP(Model Context Protocol)이 아주 핫하다. 먼저 MCP에 대해 간단히 설명하자면 MCP는 Anthropic에서 개발한 AI 관련 프로토콜로 AI 모델이 외부 데이터 소스나 도구와 표준화된 방식으로 통신할 수 있는 프로토콜이다. 예시를 들자면 Claude Desktop에 Slack MCP 서버를 연결하여 Claude Desktop에서 생성한 내용을 Slack DM으로도 보낼 수 있고, Google Map MCP Server와 연결하면 Claude Desktop에서도 지역 정보, 식당 정보 등을 찾아 볼 수 있게 된다. MCP에 대한 상세한 내용은 [MCP 공식 문서](https://modelcontextprotocol.io/introduction)를 참고하길 바란다.

처음 내가 MCP를 접했을 때는 완전 센세이션이였다. Claude Desktop에 각종 MCP 서버들을 연결하면 Claude Desktop만 가지고 Gmail과 연결하여 이메일을 보낸다던지, Google Search MCP와 연결 하여 구글 검색을 한다던지, Github MCP 서버와 연결하여 Github 관리를 한다던지 모든 것을 할 수 있는 것이였다. 그리고 MCP Server 만드는 것도 크게 어렵지않아 내가 어떤 앱을 만들고 그 앱의 MCP 서버를 만든 후 Cladue Desktop에 연결하면 그 앱의 기능들을 Claude Desktop에서 사용할 수 있는 것이다.

[MCP Servers](https://github.com/modelcontextprotocol/servers)라는 Github 레포지토리에 가면 엄청 다양한 MCP Server들을 찾아 볼 수 있다. 약 2달전(2025년 4월 쯤) [Airbnb MCP Server](https://github.com/openbnb-org/mcp-server-airbnb)(Airbnb 정식 MCP Server는 아님)가 있길래  Claude Desktop에 연결을 하고 몇가지 테스트를 해봤다. 일단 이 Airbnb MCP 서버는 Airbnb에서 공식적으로 제공하는 API가 없기 때문에 웹 크롤링을 통해서 정보를 찾은 후 정보를 제공하는 것으로 생각된다. 먼저 이 Airbnb MCP Server는 기본적으로 Airbnb 검색을 할 수 있는 기능을 제공했다. 그 당시 연동을 한 다음 "서울 양재역에 있는 1박에 30만원 이하 숙소 찾아줘" Claude Desktop을 통해 물어봤다. 
Airbnb MCP Server는 검색 결과를 제공했는데, 숙소 이름, 가격, 그리고 숙소 상세 내용을 볼 수 있는 링크까지 같이 해서 전달을 해줬다. 2달이 지난 지금 다시 Claude Desktop을 이용해서 같은 내용으로 물어봤다. 그런데 이번에는 2달전과는 다르게 가격정보만 알려주고 숙박 시설의 이름, 상세 링크 까지 제공해주지 않았다. 그리고 나서 전체 목록을 보는 링크만 전달 해주고 있었다.

## 비즈니스적 관점에서 보는 MCP Server

위 사례를 봤을 때 Airbnb에서 MCP Server를 만드는 것을 자살골을 넣는 것과 다를 것 없다고 생각한다. 내가 사용한 Airbnb MCP Server는 공식은 아니고 누군가가 크롤링 기술을 사용해서 만든 것같은데 그것도 예젠에는 됐지만 지금은 막혀서 정확한 정보고 안나오는 것 같다. 조금 생각해보면 그게 맞는 말이다. MCP Server를 만들어서 제공한다는것 이제 사용자들이 우리의 서비스에 들어오는 것이 아니라 Claude Desktop에서 사용하도록 만드는 것이다. 그건 곧 사람들이 내 서비스로 들오므로써 생기는 모든 수익적인 부분을 버린다는 것과 마찬가지다. 사실상 MCP Server를 만드는 것은 AI 툴 서비스를 하는 비즈니스에게만 좋을 뿐 내가 만들 필요가 없다.

그래서 그런지 MCP Server를 모아놓은 곳을 가보면 사실 일반인이 MCP Server를 가지고 할 수 있는 것이 많지 않다. 개발 관련해서 API만 제공하는 업체들의 MCP Server 들만 있을 뿐 무엇인가를 쉽게 조회하거나 찾거나 하는 용도의 MCP Server는 사실상 찾아볼 수 없다. 이처럼 MCP Server가 AI 툴에 여러 서비스를 프로토콜만 맞추면 붙일 수 있다는 굉장히 의미있고 중요한 기술일 수 있지만, 비즈니스적인 관점에서 볼 때는 막상 쓰려고하면 쓸만 한 용도를 찾을 수 없는 계륵과도 같아진 것이다.