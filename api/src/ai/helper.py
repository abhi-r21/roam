
def format_agent_roster(agents: dict) -> str:
    return "\n".join(f"- {name}: {desc}" for name, desc in agents.items())