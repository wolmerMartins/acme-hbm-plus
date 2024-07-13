# Acme HBM+

## Execução local

A aplicação está toda contida em containeres Docker para facilitar o desenvolvimento e execução da mesma em diferentes locais, com o mínimo de configurações necessárias.

Para executar a aplicação, basta ter um ambiente Linux (SO, WSL, VM, etc), Docker e docker compose instalado na máquina.

Comando para execução da aplicação:
```
$> bash start-dev.sh
```
Executando este comando, todas as dependências da aplicação serão instaladas, e toda infraestrutura iniciada para que a aplicação funcione corretamente.

## Domínios da aplicação

A aplicação foi dividida em três domínios principais, sendo `measurements`, `notifications` e `profile`, para uma melhor organização do código e separação das responsabilidades.

### measurements

O domínio de `measurements` é responsável por receber as medições coletadas pelo aparelho e realizar todas as regras de negócio necessárias para verificar a condição do usuário, e quando necessário, solicitar o envio de uma notificação para alertá-lo.

### notifications

O domínio de `notifications` tem a responsabilidade de enviar as notificações solicitadas pelo domínio de `measurements` para o usuário.

### profile

O domínio `profiles` gerencia os perfis dos usuários, que são utilizados para relacionar as medições com uma pessoa específica, assim como enviar as notificações para o canal adequado.

## Serviços disponíveis

### Profiles

#### Criação de perfil

> Esse serviço cria um novo perfil de usuário para ser relacionado as medições e alertas

##### Sintaxe da requisição

```
POST /profiles

body: {
    name: string
}
```

* `name` (string) [Obrigatório]\
    O nome do usuário usando o aparelho, somente o primeiro nome é esperado

### Notifications

#### Inscrição para notificações

> Se inscreve em um canal para receber as notificações relacionadas as medições

##### Sintaxe da requisição

```
POST /notifications/:profileName/subscribe
```

* `profileName` (string) [Obrigatório]\
    O nome do usuário que está usando o dispositivo

#### Cancelar inscrição para notificações

> Cancela a incrição para deixar de receber as notificações

##### Sintaxe da requisição

```
POST /notifications/:profileName/unsubscribe
```

* `profileName` (string) [Obrigatório]\
    O nome do usuário que está usando o dispositivo

### Measurements

#### Verificação da condição

> Recebe uma medição do aparelho e verifica se a mesma é regular ou irregular

##### Sintaxe da requisição

```
POST /measurements

body: {
    profile: string
    rate: number
    period: number
}
```

* `profile` (string) [Obrigatório]\
    O nome do usuário cadastrado
* `rate` (string) [Obrigatório]\
    A medição em mV (O valor _baseline_ é 0.18504999999999913, qualquer valor 20% diferente do mesmo é considerado irregular)
* `period` (string) [Obrigatório]\
    Por quanto tempo a medição foi feita em ms
