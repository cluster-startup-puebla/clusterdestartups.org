---
title: "The business of letting other people validate your idea"
description: "Thousands of people built OpenClaw on Anthropic's API. Then Dispatch arrived. The community ran the experiment; the company shipped the polished version."
excerpt: "OpenClaw, the Mac Mini and Dispatch tell the same story: the community validates the use, and the company arrives once the market is already educated."
date: "2026-03-19"
author: "Álvaro Castillo Carreño"
category: "columna"
tags: ["column", "artificial intelligence", "Anthropic", "OpenClaw"]
founders:
  - alvaro-castillo
image:
  src: "/blog/columna-validar-tu-idea.webp"
  alt: "Column cover: the Cowork Dispatch phone and laptop, with the line Working on it"
---

I love AI companies. I mean it.

They give you their API. They say here, build whatever you want. You build. You test. You pay for every token while you validate the concept. And once the market has shown there is hunger, they launch their own version.

That is what is happening with Dispatch, a new feature inside Claude Cowork. It is an autonomous assistant that lives on your computer, takes orders from your phone and works while you are away. You send a message: prepare the sales report, organize my files, answer these emails. You come back and the work is done.

Sound familiar? It does to me. Because that is what a project has been doing for months, and I no longer know what to call it. Clawdbot? Moltbot? Right: OpenClaw. The lobster that changed its name three times in a week.

We have already talked here about autonomous personal assistants. I waited for the crowd's smoke to clear before picking the conversation back up. Because now there is something concrete to look at.

## What happened to the lobster

In case you missed the novel: an Austrian developer, Peter Steinberger, built a personal assistant as a weekend project. He connected it to Claude through the API, named it Clawdbot for the lobster logo and put it on GitHub.

It exploded. More than 100,000 stars in weeks. One of the fastest-growing open-source projects in the history of the platform.

But the name stepped on Anthropic's brand. The lawyers' letter arrived. First change: Moltbot, because a lobster molts its shell. It lasted three days: nobody understood it. Second change: OpenClaw. Domains secured, trademark searches, and a promise that this time the name was final.

In the middle of all that: fake accounts, fraudulent cryptocurrency tokens, security alerts from Cisco and Palo Alto Networks, and a creator growing faster than he could secure his code. The project now has almost half a million lines of code, 70 dependencies and an attack surface that would make any auditor sweat.

## Then came the Mac Mini meme

OpenClaw needs a computer that stays on around the clock. The community found that the Mac Mini — quiet, small, efficient — was the perfect machine for it.

Twitter filled with photos of Mac Minis on shelves, in closets, behind monitors. Guides for setting one up without a screen. People buying fake eight-dollar HDMI adapters to fool macOS. Even UGREEN, the accessories brand, published an analysis of which docking station suits your personal AI server.

Steinberger himself had to come out and ask people not to buy a Mac Mini. This runs on a server that costs five dollars a month.

Nobody listened.

And here is what almost nobody explained well: OpenClaw does not run an AI model on your machine. It is an orchestrator. It sends instructions to Claude or GPT, which live in the cloud. Your computer only coordinates. It is like having an assistant who works from your desk but calls the experts. The Mac Mini is the desk, not the brain.

Running a local model with Ollama is possible, but that is another level of hardware, another memory budget and another kind of user.

## The explosion of claws

Every viral open project does the same thing: alternatives appear. And they appeared fast.

- Nanobot, from the University of Hong Kong: 4,000 lines of Python. What OpenClaw does in half a million lines, distilled to the skeleton. Useful for understanding how an AI agent works on the inside.
- PicoClaw, from Sipeed: written in Go, it runs on ten-dollar hardware with less than 10 MB of RAM. It starts in under a second. Built for routers, cameras and embedded devices.
- NanoClaw, ZeroClaw, IronClaw, NullClaw. Each one attacks a different angle: security, minimalism, multiple agents.

And yes: we made ours too. It is called [Banabot](https://github.com/Mrbanano/banabot). If everyone was going to make their version of the lobster, we made a banana.

## Dispatch

Once the smoke cleared, Anthropic made its move. Dispatch works like this: you pair your phone with your computer by scanning a QR code. You send Claude tasks from wherever you are. Claude runs them on your desktop: it reaches your files, your tools, your plugins. The code runs in an isolated sandbox. Your data does not leave your machine. And it asks permission before it touches anything important.

It is the same concept that lit up half the internet two months ago. Only now it is packaged for people who do not know, and do not want to know, what Node.js is, what a daemon is, or what headless means.

It is still early. MacStories' tests report that it works about half the time on complex tasks. There are no notifications when a job finishes. There is only one conversation thread. But the direction is clear.

## What I keep turning over

Back to the starting point. Anthropic gave them the API. Thousands of people built OpenClaw on that API, paying for every token. They validated that people want an assistant that does things, not one that only answers questions. And now Anthropic launches Dispatch: safer, simpler, no terminal.

I am not saying it is a trick. I am saying it is a brilliant business model. Your community does the research and development, discovers the use cases, takes on the security risks, and you ship the polished version once the market is already educated.

The 320,000 GitHub stars, the three names, the Mac Minis in closets, the bananas and the lobsters: all of that was the community shouting that we want this. And now the companies are answering.

The real question is who keeps the trust. The open project that nobody fully audited? Or the company that charges twenty dollars a month but gives you a sandbox and explicit permissions?

Total control with the risk included, or convenience with a monthly bill?

This piece was first published on [LinkedIn](https://www.linkedin.com/pulse/el-negocio-de-dejar-que-otros-validen-tu-idea-alvaro-castillo-bnuge/).
